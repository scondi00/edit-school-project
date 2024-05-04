import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminRadionicaEdit({ item, setModalEdit, set }) {
  const [teme, setTeme] = useState([]);
  const [tezine, setTezine] = useState([]);

  const [editRadionica, setEditRadionica] = useState({
    predavac: "",
    opis: "",
    datum: "",
    teme: [],
    tezina: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/teme")
      .then((r) => setTeme(r.data))
      .catch((error) => alert(error));
    axios
      .get("http://localhost:3001/tezine")
      .then((r) => setTezine(r.data))
      .catch((error) => alert(error));
  }, []);

  function formatData() {
    const data = {};

    // ako smo unijeli novu promjenu, formatiraj podatke za slanje
    if (editRadionica.predavac !== "") {
      data.predavac = editRadionica.predavac;
    }
    if (editRadionica.opis !== "") {
      data.opis = editRadionica.opis;
    }
    if (editRadionica.datum !== "") {
      data.datum = editRadionica.datum;
    }
    if (editRadionica.teme.length) {
      data.teme = editRadionica.teme;
    }
    if (editRadionica.tezina !== "") {
      data.tezina = editRadionica.tezina;
    }

    return data;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRadionica({ ...editRadionica, [name]: value });
  };
  const handleOdabraneTeme = (e) => {
    if (!editRadionica.teme.includes(e.target.value)) {
      setEditRadionica((prevData) => ({
        ...prevData,
        teme: [...prevData.teme, e.target.value],
      }));
    } else {
      setEditRadionica((prevData) => ({
        ...prevData,
        teme: prevData.teme.filter((item) => item !== e.target.value),
      }));
    }
  };

  async function postIzmjenu(e) {
    e.preventDefault();

    if (window.confirm("Jeste li sigurni da želite spremiti promjene?")) {
      const promjeniPodatke = formatData();

      await axios
        .patch(`http://localhost:3001/radionice/${item.id}`, promjeniPodatke)
        .then((r) => {
          setModalEdit(false);
          axios
            .get("http://localhost:3001/radionice")
            .then((r) => {
              set(r.data);
            })
            .catch((err) => alert(err));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setModalEdit(false)}>X</button>
        <h2>Uredi radionicu: {item.ime}</h2>
        <form onSubmit={postIzmjenu}>
          <div>
            Promjeni predavaca{" "}
            <input
              type="text"
              name="predavac"
              value={editRadionica.predavac}
              onChange={handleChange}
            />
          </div>
          <div>
            Promjeni opis:{" "}
            <input
              type="text"
              name="opis"
              value={editRadionica.opis}
              onChange={handleChange}
            />
          </div>
          <div>
            Promjeni datum:
            <input
              type="date"
              name="datum"
              value={editRadionica.datum}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              {" "}
              Promjeni tezinu
              <select
                name="tezina"
                onChange={handleChange}
                value={editRadionica.tezina}
              >
                <option value=""> --- </option>
                {tezine.map((r) => (
                  <option key={r.id}>{r.ime}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              {" "}
              Promjeni teme:
              {teme.map((r) => (
                <div key={r.id}>
                  <label>{r.ime}</label>
                  <input
                    type="checkbox"
                    name="teme"
                    value={r.ime}
                    onChange={handleOdabraneTeme}
                  />
                </div>
              ))}
            </label>
          </div>
          <input type="submit" value="Spremi" />
        </form>
      </div>
    </div>
  );
}
