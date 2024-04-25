import axios from "axios";
import { useEffect, useState, useContext } from "react";
//import { pageContext } from "./Administracija";
import Tablica from "../components/Tablica";
import DodajNovogPredavaca from "../components/Modals/DodajNovogPredavaca";

export default function AdminPredavaci() {
  const [predavaci, setPredavaci] = useState([]);
  const [modalDodajPredavac, setModalDodajPredavaca] = useState(false);
  //const { page, setPage } = useContext(pageContext);

  useEffect(() => {
    //setPage("predavaci");
    axios
      .get(`http://localhost:3001/predavaci`)
      .then((r) => setPredavaci(r.data));
  }, []);

  return (
    <div>
      <button onClick={() => setModalDodajPredavaca(true)}>Dodaj</button>
      <Tablica
        result={predavaci}
        stupci={[
          { label: "Ime", variable: "ime" },
          { label: "Organizacija", variable: "organizacija" },
        ]}
      />
      {modalDodajPredavac && (
        <DodajNovogPredavaca
          setModalDodajPredavaca={setModalDodajPredavaca}
          setPredavaci={setPredavaci}
        />
      )}
    </div>
  );
}
