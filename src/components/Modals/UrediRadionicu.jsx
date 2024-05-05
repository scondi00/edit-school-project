import axios from "axios";
import { useEffect, useState } from "react";
export default function UrediRadionicu({
  currentRadionica,
  setModalUrediRadionicu,
  setRadionice,
}) {
  const [teme, setTeme] = useState([]);
  const [tezine, setTezine] = useState([]);

  const [editRadionica, setEditRadionica] = useState({
    predavac: "",
    opis: "",
    datum: "",
    broj_prijava: "",
    img: "",
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
    if (editRadionica.img !== "") {
      data.img = editRadionica.img;
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
        .patch(
          `http://localhost:3001/radionice/${currentRadionica.id}`,
          promjeniPodatke
        )
        .then((r) => {
          //možemo reload-at sve na ovaj naćin
          // window.location.reload();

          //ili ponovo pomoću axiosa:

          axios
            .get("http://localhost:3001/radionice")
            .then((r) => {
              setModalUrediRadionicu(false);
              setRadionice(r.data);
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
        <button
          className="exit-modal"
          onClick={() => setModalUrediRadionicu(false)}
        >
          X
        </button>
        <h2>Uredi radionicu: {currentRadionica.ime}</h2>
        <p style={{ color: "rgba(108, 108, 108)" }}>
          Nije nužuno mijenjati sve podatke.
        </p>
        <p style={{ color: "rgba(108, 108, 108)" }}>
          Ukoliko se podatak ne promijeni, ostat će stara vrijednost.
        </p>
        <div className="modal-body">
          <form onSubmit={postIzmjenu}>
            <div>
              Promjeni predavača:{" "}
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
              Promjeni sliku:{" "}
              <input
                type="text"
                name="img"
                value={editRadionica.img}
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
            Promjeni težinu:
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
            <hr />
            <p>Promjeni teme:</p>
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
            <input type="submit" value="Spremi" />
          </form>
        </div>
      </div>
    </div>
  );
}
