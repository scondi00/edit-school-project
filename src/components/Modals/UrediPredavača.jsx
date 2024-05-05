import axios from "axios";
import { useState } from "react";

export default function UrediPredavača({
  setModalUrediPredavac,
  currentPredavac,
  teme,
  organizacije,
  setPredavaci,
}) {
  const [editPredavaca, setEditPredavaca] = useState({
    ime: "",
    biografija: "",
    organizacija: "",
    img: "",
    teme: [],
  });

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
    if (editPredavaca.img !== "") {
      data.img = editPredavaca.img;
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
        .patch(
          `http://localhost:3001/predavaci/${currentPredavac.id}`,
          promjeniPodatke
        )
        .then((r) => {
          //  window.location.reload()
          axios.get("http://localhost:3001/predavaci").then((r) => {
            setPredavaci(r.data);
            setModalUrediPredavac(false);
          });
        })
        .catch((err) => alert(err));
    }
  }
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="exit-modal"
          onClick={() => {
            setModalUrediPredavac(false);
          }}
        >
          X
        </button>

        <h2>Uredi predavača: {currentPredavac.ime}</h2>
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
            <input
              type="text"
              name="img"
              placeholder="Link na sliku predavaca"
              value={editPredavaca.img}
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
            Odaberi temu:
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
