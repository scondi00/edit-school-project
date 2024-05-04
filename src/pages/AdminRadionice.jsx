// AdminRadionice.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Tablica from "../components/Tablica";
import DodajNovuRadionicu from "../components/Modals/DodajNovuRadionicu";
//import { pageContext } from "./Administracija";

export default function AdminRadionice() {
  //const { page, setPage } = useContext(pageContext);
  const [radionice, setRadionice] = useState([]);
  const [modalDodajRadionicu, setModalDodajRadionicu] = useState(false);

  useEffect(() => {
    //setPage("radionice");
    axios
      .get(`http://localhost:3001/radionice`)
      .then((r) => setRadionice(r.data));
  }, []);

  return (
    <div>
      <button onClick={() => setModalDodajRadionicu(true)}>Dodaj</button>
      <Tablica
        ime={"radionice"}
        set={setRadionice}
        result={radionice}
        stupci={[
          { label: "Ime", variable: "ime" },
          { label: "Broj prijava", variable: "broj_prijava" },
          { label: "Datum", variable: "datum" },
        ]}
      />
      {modalDodajRadionicu && (
        <DodajNovuRadionicu
          setModalDodajRadionicu={setModalDodajRadionicu}
          setRadionice={setRadionice}
        />
      )}
    </div>
  );
}
