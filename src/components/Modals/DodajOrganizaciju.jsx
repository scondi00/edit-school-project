import axios from "axios";
import { useState, useEffect } from "react";

export default function DodajOrganizaciju({
  setModalDodajOrg,
  setOrganizacije,
}) {
  const [radionice, setRadionice] = useState([]);
  const [novaOrg, setNovaOrg] = useState({
    id: "",
    ime: "",
    opis: "",
    radionice: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/radionice")
      .then((r) => setRadionice(r.data));
  }, []);

  function obradiPodatke(objekt) {
    return {
      id: objekt.id,
      ime: objekt.ime,
      opis: objekt.opis,
      radionice: objekt.radionice,
    };
  }

  const handleOdabraneRadionice = (e) => {
    if (!novaOrg.radionice.includes(e.target.value)) {
      setNovaOrg((prevData) => ({
        ...prevData,
        radionice: [...prevData.radionice, e.target.value],
      }));
    } else {
      setNovaOrg((prevData) => ({
        ...prevData,
        radionice: prevData.radionice.filter((item) => item !== e.target.value),
      }));
    }
  };
  const changeInput = (e) => {
    const { name, value } = e.target;
    setNovaOrg({ ...novaOrg, [name]: value });
  };

  const dodajNovuOrg = (e) => {
    e.preventDefault();

    const podaciZaSlanje = obradiPodatke(novaOrg);
    axios
      .post("http://localhost:3001/organizacije", podaciZaSlanje)
      .then((r) => {
        axios.get("http://localhost:3001/organizacije").then((r) => {
          setOrganizacije(r.data);
          setModalDodajOrg(false);
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setModalDodajOrg(false)}>X</button>
        <h2>Dodaj novu organizaciju:</h2>
        <form onSubmit={dodajNovuOrg}>
          <input
            type="text"
            name="id"
            placeholder="id"
            required
            value={novaOrg.id}
            onChange={changeInput}
          />
          <input
            type="text"
            name="ime"
            placeholder="ime"
            required
            value={novaOrg.ime}
            onChange={changeInput}
          />
          <input
            type="text"
            name="opis"
            placeholder="opis"
            required
            value={novaOrg.opis}
            onChange={changeInput}
          />
          <label>
            {" "}
            Sudjeluje li Vaša nova organizacija u nekoj od radionica?
            <input type="checkbox" value="" /> Ne sudjeluje
            {radionice.map((r) => (
              <div key={r.id}>
                <input
                  type="checkbox"
                  name="radionice"
                  value={r.ime}
                  onChange={handleOdabraneRadionice}
                />{" "}
                {r.ime}
              </div>
            ))}
          </label>
          <input type="submit" value="Dodaj" />
        </form>
      </div>
    </div>
  );
}
