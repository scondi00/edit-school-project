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
    <div className="admin-radionice-div">
      <Tablica
        ime={"predavaci"}
        result={predavaci}
        set={setPredavaci}
        stupci={[
          { label: "Ime", variable: "ime" },
          { label: "Organizacija", variable: "organizacija" },
        ]}
      />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          className="admin-add-btn"
          onClick={() => setModalDodajPredavaca(true)}
        >
          +
        </button>
      </div>
      {modalDodajPredavac && (
        <DodajNovogPredavaca
          setModalDodajPredavaca={setModalDodajPredavaca}
          setPredavaci={setPredavaci}
        />
      )}
    </div>
  );
}
