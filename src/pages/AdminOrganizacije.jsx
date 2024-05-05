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
    <div className="admin-radionice-div">
      <Tablica
        ime={"organizacije"}
        set={setOrganizacije}
        result={organizacije}
        stupci={[
          { label: "Ime", variable: "ime" },
          { label: "Radionice", variable: "radionice" },
        ]}
      />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          className="admin-add-btn"
          onClick={() => setModalDodajOrg(true)}
        >
          +
        </button>
      </div>
      {modalDodajOrg && (
        <DodajOrganizaciju
          setModalDodajOrg={setModalDodajOrg}
          setOrganizacije={setOrganizacije}
        />
      )}
    </div>
  );
}
