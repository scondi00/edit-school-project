import { useEffect, useState, useContext } from "react";
import "../css-files/radionice.css";
import axios from "axios";
import Radionica from "../components/Radionica";
import FilterRadionice from "../components/FilterRadionice";
import Prijava from "../components/Modals/Prijava";
import { AdminContext } from "../App";
import DodajNovuRadionicu from "../components/Modals/DodajNovuRadionicu";
import UrediRadionicu from "../components/Modals/UrediRadionicu";

export default function Radionice() {
  const radioniceURL = "http://localhost:3001/radionice";

  const { isAdmin, setAdmin } = useContext(AdminContext);

  const [radionice, setRadionice] = useState([]); // radionice, sve ili filtrirane

  //filteri
  const [filterTeme, setFilterTeme] = useState([]); // dodajemo po kojim cemo temama filtrirati
  const [filterTezina, setFilterTezina] = useState([]); // dodajemo po kojim cemo organizacijama filtrirati

  //MODAL WINDOWS
  const [modal, setModal] = useState(false);
  const [dodajRadionicu, setDodajRadionicu] = useState(false); // modal window za dodavanje nove radionice
  const [modalUrediRadionicu, setModalUrediRadionicu] = useState(false);

  const [currentRadionica, setCurrentRadionica] = useState({}); // prosljeđujemo trenutnu radionicu na koju se zelimo prijaviti ili urediti

  //first get data from json server
  useEffect(() => {
    axios
      .get(radioniceURL)
      .then((res) => {
        // ako nismo postavili filter, postavi sve radionice
        if (!filterTezina.length && !filterTeme.length) {
          setRadionice(res.data);
        } else {
          //ako smo postavili filterTezina, dohvati sve i filtiraj po zadanim filterima
          const filtriraniPodaci = res.data.filter((radionica) => {
            const filterTemaPassed =
              !filterTeme.length ||
              radionica.teme.some((tema) => filterTeme.includes(tema));

            const filterTezinaPassed =
              !filterTezina.length || filterTezina.includes(radionica.tezina);

            return filterTezinaPassed && filterTemaPassed;
          });
          setRadionice(filtriraniPodaci);
        }
      })
      .catch((err) => alert(err));
  }, [filterTeme, filterTezina]);

  console.log(isAdmin);

  return (
    <div className="page-div">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="title">Radionice</div>
        {isAdmin && (
          <button
            className="add-workshop-btn"
            onClick={() => setDodajRadionicu(true)}
          >
            + Dodaj novu radionicu
          </button>
        )}
      </div>
      <div className="filter-i-radionice">
        <FilterRadionice
          filterTeme={filterTeme}
          setFilterTeme={setFilterTeme}
          filterTezina={filterTezina}
          setFilterTezina={setFilterTezina}
        />
        <div className="radionice">
          {radionice.map((r) => (
            <Radionica
              key={r.id}
              result={r}
              setModal={setModal}
              setModalUrediRadionicu={setModalUrediRadionicu}
              setRadionicaPrijava={setCurrentRadionica}
            />
          ))}
        </div>
        {/* Ako je modal true, otvori prozor za prijavu */}
        {modal && (
          <Prijava
            setModal={setModal}
            currentRadionica={currentRadionica}
            setRadionice={setRadionice}
          />
        )}
        {dodajRadionicu && (
          <DodajNovuRadionicu
            setModalDodajRadionicu={setDodajRadionicu}
            setRadionice={setRadionice}
          />
        )}
        {modalUrediRadionicu && (
          <UrediRadionicu
            setModalUrediRadionicu={setModalUrediRadionicu}
            currentRadionica={currentRadionica}
            setRadionice={setRadionice}
            setFilterTezina={setFilterTezina}
            setFilterTeme={setFilterTeme}
          />
        )}
      </div>
    </div>
  );
}
