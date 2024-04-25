import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { pageContext } from "./Administracija";

import DodajOrganizaciju from "../components/Modals/DodajOrganizaciju";
import Tablica from "../components/Tablica";

export default function AdminOrganizacije() {
  const [organizacije, setOrganizacije] = useState([]);
  const [modalDodajOrg, setModalDodajOrg] = useState(false);
  //const { page, setPage } = useContext(pageContext);

  useEffect(() => {
    //setPage("organizacije");
    axios
      .get(`http://localhost:3001/organizacije`)
      .then((r) => setOrganizacije(r.data));
  }, []);

  return (
    <div>
      <button onClick={() => setModalDodajOrg(true)}>Dodaj</button>
      <Tablica
        result={organizacije}
        stupci={[{ label: "Ime", variable: "ime" }]}
      />
      {modalDodajOrg && (
        <DodajOrganizaciju
          setModalDodajOrg={setModalDodajOrg}
          setOrganizacije={setOrganizacije}
        />
      )}
    </div>
  );
}
