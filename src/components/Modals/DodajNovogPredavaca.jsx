import { useState, useEffect } from "react";
import axios from "axios";
export default function DodajNovogPredavaca({
  setModalDodajPredavaca,
  setPredavaci,
}) {
  const [teme, setTeme] = useState([]);
  const [organizacije, setOrganizacije] = useState([]);
  const [noviPredavac, setNoviPredavac] = useState({
    id: "",
    ime: "",
    biografija: "",
    organizacija: "",
    img: "",
    teme: [],
    radionice: [],
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

  const changeInput = (e) => {
    const { name, value } = e.target;
    setNoviPredavac({ ...noviPredavac, [name]: value });
  };
  const handleOdabraneTeme = (e) => {
    if (!noviPredavac.teme.includes(e.target.value)) {
      setNoviPredavac((prevData) => ({
        ...prevData,
        teme: [...prevData.teme, e.target.value],
      }));
    } else {
      setNoviPredavac((prevData) => ({
        ...prevData,
        teme: prevData.teme.filter((item) => item !== e.target.value),
      }));
    }
  };

  function obradiPodatke(objekt) {
    return {
      id: objekt.id,
      ime: objekt.ime,
      biografija: objekt.biografija,
      organizacija: objekt.organizacija,
      img: objekt.img,
      teme: objekt.teme,
      radionice: objekt.radionice,
    };
  }

  const dodajPredavaca = (e) => {
    e.preventDefault();
    const podaciZaSlanje = obradiPodatke(noviPredavac);

    axios
      .post("http://localhost:3001/predavaci", podaciZaSlanje)
      //.then((r) => window.location.reload())
      .then((r) => {
        axios.get("http://localhost:3001/predavaci").then((r) => {
          setPredavaci(r.data);
          setModalDodajPredavaca(false);
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="exit-modal"
          onClick={() => setModalDodajPredavaca(false)}
        >
          X
        </button>
        <h1>Dodaj novog predavača</h1>
        <div className="modal-body">
          <form onSubmit={dodajPredavaca}>
            <input
              type="text"
              name="id"
              placeholder="Id predavača..."
              required
              value={noviPredavac.id}
              onChange={changeInput}
            />
            <input
              type="text"
              name="ime"
              placeholder="Ime predavača..."
              required
              value={noviPredavac.ime}
              onChange={changeInput}
            />
            <input
              type="text"
              name="biografija"
              placeholder="Biografija predavača..."
              required
              value={noviPredavac.biografija}
              onChange={changeInput}
            />
            <input
              type="text"
              name="img"
              placeholder="Link na sliku predavača"
              required
              value={noviPredavac.img}
              onChange={changeInput}
            />
            Odaberi organizaciju
            <select
              name="organizacija"
              value={noviPredavac.organizacija}
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
            <input type="submit" value="Dodaj predavača" />
          </form>
        </div>
      </div>
    </div>
  );
}
