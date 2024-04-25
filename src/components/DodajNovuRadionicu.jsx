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
  }, []);

  function obradiPodatke(objekt) {
    return {
      id: objekt.id,
      ime: objekt.ime,
      datum: objekt.datum,
      predavac: objekt.predavac,
      opis: objekt.opis,
      broj_prijava: objekt.broj_prijava,
      img: objekt.img,
      teme: objekt.teme,
      tezina: objekt.tezina,
    };
  }

  const dodajRadionicu = (e) => {
    e.preventDefault();
    const podaciZaSlanje = obradiPodatke(novaRadionica);

    axios
      .post("http://localhost:3001/radionice", podaciZaSlanje)
      //.then((r) => window.location.reload())
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
    if (!novaRadionica.teme.includes(e.target.value)) {
      setNovaRadionica((prevData) => ({
        ...prevData,
        teme: [...prevData.teme, e.target.value],
      }));
    } else {
      setNovaRadionica((prevData) => ({
        ...prevData,
        teme: prevData.teme.filter((item) => item !== e.target.value),
      }));
    }
  };
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setModalDodajRadionicu(false)}>X</button>
        <h1>Dodaj novu radionicu</h1>
        <div>
          <form onSubmit={dodajRadionicu}>
            <input
              type="text"
              name="id"
              placeholder="id"
              required
              value={novaRadionica.id}
              onChange={changeInput}
            />
            <input
              type="text"
              name="ime"
              placeholder="ime"
              required
              value={novaRadionica.ime}
              onChange={changeInput}
            />
            <input
              type="text"
              name="predavac"
              placeholder="ime predavača"
              required
              value={novaRadionica.predavac}
              onChange={changeInput}
            />
            <input
              type="text"
              name="opis"
              placeholder="opis"
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
            <label>
              Odaberi težinu
              {tezine.map((r) => (
                <div key={r.id}>
                  <label>{r.ime}</label>
                  <input
                    type="radio"
                    name="tezina"
                    value={r.ime}
                    onChange={changeInput}
                  />
                </div>
              ))}
            </label>
            <br />
            <hr />
            Odaberi temu:
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
            <input type="submit" value="Dodaj" />
          </form>
        </div>
      </div>
    </div>
  );
}
