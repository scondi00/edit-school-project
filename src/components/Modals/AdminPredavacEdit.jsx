import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPredavacEdit({ item, setModalEdit, set }) {
  const [teme, setTeme] = useState([]);
  const [organizacije, setOrganizacije] = useState([]);
  const [editPredavaca, setEditPredavaca] = useState({
    ime: "",
    biografija: "",
    organizacija: "",
    teme: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/teme")
      .then((r) => setTeme(r.data))
      .catch((error) => alert(error));
    axios
      .get("http://localhost:3001/organizacije")
      .then((r) => setOrganizacije(r.data))
      .catch((error) => alert(error));
  }, []);

  function formatData() {
    const data = {};

    // ako smo unijeli novu promjenu, formatiraj podatke za slanje
    if (editPredavaca.ime !== "") {
      data.ime = editPredavaca.ime;
    }
    if (editPredavaca.biografija !== "") {
      data.biografija = editPredavaca.biografija;
    }
    if (editPredavaca.organizacija !== "") {
      data.organizacija = editPredavaca.organizacija;
    }
    if (editPredavaca.teme.length) {
      data.teme = editPredavaca.teme;
    }

    return data;
  }

  const changeInput = (e) => {
    const { name, value } = e.target;
    setEditPredavaca({ ...editPredavaca, [name]: value });
  };

  const handleOdabraneTeme = (e) => {
    if (!editPredavaca.teme.includes(e.target.value)) {
      setEditPredavaca((prevData) => ({
        ...prevData,
        teme: [...prevData.teme, e.target.value],
      }));
    } else {
      setEditPredavaca((prevData) => ({
        ...prevData,
        teme: prevData.teme.filter((item) => item !== e.target.value),
      }));
    }
  };

  async function urediPredavaca(e) {
    e.preventDefault();
    if (window.confirm("Jeste li sigurni da želite spremiti promjene?")) {
      const promjeniPodatke = formatData();

      await axios
        .patch(`http://localhost:3001/predavaci/${item.id}`, promjeniPodatke)
        .then((r) => {
          setModalEdit(false);
          axios
            .get("http://localhost:3001/predavaci")
            .then((r) => {
              set(r.data);
            })
            .catch((err) => alert(err));
        })
        .catch((err) => alert(err));
    }
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="exit-modal" onClick={() => setModalEdit(false)}>
          X
        </button>
        <h2>Uredi predavača: {item.ime}</h2>
        <p style={{ color: "rgba(108, 108, 108)" }}>
          Nije nužuno mijenjati sve podatke.
        </p>
        <p style={{ color: "rgba(108, 108, 108)" }}>
          Ukoliko se podatak ne promijeni, ostat će stara vrijednost.
        </p>
        <div className="modal-body">
          <form onSubmit={urediPredavaca}>
            <input
              type="text"
              name="ime"
              placeholder="ime"
              value={editPredavaca.ime}
              onChange={changeInput}
            />
            <input
              type="text"
              name="biografija"
              placeholder="biografija"
              value={editPredavaca.biografija}
              onChange={changeInput}
            />
            Odaberi organizaciju
            <select
              name="organizacija"
              value={editPredavaca.organizacija}
              onChange={changeInput}
            >
              <option value={""}>---</option>
              {organizacije.map((r) => (
                <option key={r.id}>{r.ime}</option>
              ))}
            </select>
            <br />
            Odaberi teme predavača:
            {teme.map((r) => (
              <div key={r.id} className="odaberi-temu">
                <input
                  type="checkbox"
                  id={r.id}
                  name="teme"
                  value={r.ime}
                  onChange={handleOdabraneTeme}
                />
                <label>{r.ime}</label>
              </div>
            ))}
            <input type="submit" value="Spremi promjene" />
          </form>
        </div>
      </div>
    </div>
  );
}
