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
    broj_prijava: "",
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
    if (editRadionica.broj_prijava !== "") {
      data.broj_prijava = editRadionica.broj_prijava;
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
        <button className="exit-modal" onClick={() => setModalEdit(false)}>
          X
        </button>
        <h2>Uredi radionicu: {item.ime}</h2>
        <p style={{ color: "rgba(108, 108, 108)" }}>
          Nije nužuno mijenjati sve podatke.
        </p>
        <p style={{ color: "rgba(108, 108, 108)" }}>
          Ukoliko se podatak ne promijeni, ostat će stara vrijednost.
        </p>
        <div className="modal-body">
          <form onSubmit={postIzmjenu}>
            <div>
              Promjeni ime predavača{" "}
              <input
                type="text"
                name="predavac"
                value={editRadionica.predavac}
                onChange={handleChange}
              />
            </div>
            <label>
              Uredi broj prijava:
              <select
                className="modal-input"
                value={editRadionica.broj_prijava}
                onChange={handleChange}
                name="broj_prijava" // Name set to identify which state is being updated
              >
                <option value="">Choose...</option>
                {[...Array(21).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
                <option value="">Ne želim promjeniti broj prijava</option>
              </select>
            </label>
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
                Promjeni težinu
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
              Promjeni teme:
              {teme.map((r) => (
                <div key={r.id} className="odaberi-temu">
                  <input
                    type="checkbox"
                    name="teme"
                    value={r.ime}
                    onChange={handleOdabraneTeme}
                  />
                  <label>{r.ime}</label>
                </div>
              ))}
            </div>
            <input type="submit" value="Spremi" />
          </form>
        </div>
      </div>
    </div>
  );
}
