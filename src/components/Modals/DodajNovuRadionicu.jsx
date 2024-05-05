import { useEffect, useState } from "react";
import axios from "axios";

export default function DodajNovuRadionicu({
  setModalDodajRadionicu,
  setRadionice,
}) {
  const [novaRadionica, setNovaRadionica] = useState({
    id: "",
    ime: "",
    datum: "",
    predavac: "",
    opis: "",
    broj_prijava: 0,
    img: "",
    teme: [],
    tezina: "",
  });

  const [teme, setTeme] = useState([]);
  const [tezine, setTezine] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/teme")
      .then((r) => setTeme(r.data))
      .catch((error) => alert(error));
    axios
      .get("http://localhost:3001/tezine")
      .then((r) => setTezine(r.data))
      .catch((error) => alert(error));
    axios
      .get("http://localhost:3001/predavaci")
      .then((r) => setPredavaci(r.data))
      .catch((error) => alert(error));
  }, []);

  const obradiPodatke = (objekt) => ({
    id: objekt.id,
    ime: objekt.ime,
    datum: objekt.datum,
    predavac: objekt.predavac,
    opis: objekt.opis,
    broj_prijava: objekt.broj_prijava,
    img: objekt.img,
    teme: objekt.teme,
    tezina: objekt.tezina,
  });

  const dodajRadionicu = (e) => {
    e.preventDefault();
    const podaciZaSlanje = obradiPodatke(novaRadionica);

    axios
      .post("http://localhost:3001/radionice", podaciZaSlanje)
      .then((r) => {
        axios.get("http://localhost:3001/radionice").then((r) => {
          setRadionice(r.data);
          setModalDodajRadionicu(false);
        });
      })
      .catch((err) => alert(err));
  };

  const changeInput = (e) => {
    const { name, value } = e.target;
    setNovaRadionica({ ...novaRadionica, [name]: value });
  };

  const handleOdabraneTeme = (e) => {
    const { value } = e.target;
    setNovaRadionica((prevData) => ({
      ...prevData,
      teme: prevData.teme.includes(value)
        ? prevData.teme.filter((item) => item !== value)
        : [...prevData.teme, value],
    }));
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="exit-modal"
          onClick={() => setModalDodajRadionicu(false)}
        >
          X
        </button>
        <h1>Dodaj novu radionicu</h1>
        <div className="modal-body">
          <form onSubmit={dodajRadionicu}>
            <input
              type="text"
              name="id"
              placeholder="ID radionice"
              required
              value={novaRadionica.id}
              onChange={changeInput}
            />
            <input
              type="text"
              name="ime"
              placeholder="Ime radionice"
              required
              value={novaRadionica.ime}
              onChange={changeInput}
            />
            <input
              type="text"
              name="img"
              placeholder="Link za sliku radionice"
              required
              value={novaRadionica.img}
              onChange={changeInput}
            />
            <input
              type="text"
              name="predavac"
              placeholder="Ime predavača"
              required
              value={novaRadionica.predavac}
              onChange={changeInput}
            />
            <input
              type="text"
              name="opis"
              placeholder="Opis radionice"
              required
              value={novaRadionica.opis}
              onChange={changeInput}
            />
            <input
              type="date"
              name="datum"
              required
              value={novaRadionica.datum}
              onChange={changeInput}
            />
            <p>Odaberi težinu:</p>
            {tezine.map((r) => (
              <div key={r.id} className="odaberi-tezinu">
                <input
                  type="radio"
                  name="tezina"
                  value={r.ime}
                  onChange={changeInput}
                />
                <label>{r.ime}</label>
              </div>
            ))}
            <hr />
            <p>Odaberi temu:</p>
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
            <input type="submit" value="Dodaj" />
          </form>
        </div>
      </div>
    </div>
  );
}
