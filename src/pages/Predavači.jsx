import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Predavac from "../components/Predavac";
import FilterPredavaci from "../components/FilterPredavaci";
import DodajNovogPredavaca from "../components/Modals/DodajNovogPredavaca";
import UrediPredavača from "../components/Modals/UrediPredavača";
import "../css-files/predavaci.css";

import { AdminContext } from "../App";

export default function Predavači() {
  const { isAdmin, setAdmin } = useContext(AdminContext);
  const [predavaci, setPredavaci] = useState([]); // predavaci, svi ili filtrirani
  const [filterTeme, setFilterTeme] = useState([]); // dodajemo po kojim cemo temama filtrirati
  const [filterOrganizacija, setFilterOrganizacija] = useState([]); // dodajemo po kojim cemo organizacijama filtrirati

  //URLS
  const predavaciURL = "http://localhost:3001/predavaci";
  const temeURL = "http://localhost:3001/teme";
  const organizacijeURL = "http://localhost:3001/organizacije";

  const [teme, setTeme] = useState([]); // sve teme sa  servera po kojem cemo filtrirati
  const [organizacije, setOrganizacije] = useState([]); // sve organizacije sa servera po kojima cemo filtrirati

  //MODAL WINDOWS
  const [modalNoviPredavac, setModalNoviPredavac] = useState(false);
  const [modalUrediPredavaca, setModalUrediPredavac] = useState(false);

  const [currentPredavac, setCurrentPredavac] = useState({});

  // dohvacamo teme i organizacije sa servera
  useEffect(() => {
    axios
      .get(organizacijeURL)
      .then((res) => setOrganizacije(res.data))
      .catch((err) => alert(err));
    axios
      .get(temeURL)
      .then((res) => setTeme(res.data))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    axios
      .get(predavaciURL)
      .then((res) => {
        if (!filterTeme.length && !filterOrganizacija) {
          setPredavaci(res.data);
        } else {
          const filtriraniPodaci = res.data.filter((predavac) => {
            const filterOrganizacijaPassed =
              !filterOrganizacija.length ||
              filterOrganizacija.includes(predavac.organizacija);

            const filterTemaPassed =
              !filterTeme.length ||
              predavac.teme.some((tema) => filterTeme.includes(tema));

            return filterOrganizacijaPassed && filterTemaPassed;
          });

          setPredavaci(filtriraniPodaci);
        }
      })
      .catch((err) => alert(err));
  }, [filterTeme, filterOrganizacija]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="title">Predavači</div>

        {isAdmin && (
          <button
            className="add-workshop-btn"
            onClick={() => setModalNoviPredavac(true)}
          >
            {" "}
            + Dodaj novog predavača
          </button>
        )}
      </div>

      <div className="filter-i-radionice">
        <FilterPredavaci
          filterTeme={filterTeme}
          filterOrganizacija={filterOrganizacija}
          setFilterTeme={setFilterTeme}
          setFilterOrganizacija={setFilterOrganizacija}
          teme={teme}
          organizacije={organizacije}
        />

        <div className="predavaci-div">
          {predavaci.map((res) => (
            <Predavac
              key={res.id}
              result={res}
              setCurrentPredavac={setCurrentPredavac}
              setModalUrediPredavac={setModalUrediPredavac}
            />
          ))}
        </div>
      </div>
      {modalNoviPredavac && (
        <DodajNovogPredavaca
          setModalDodajPredavaca={setModalNoviPredavac}
          setPredavaci={setPredavaci}
        />
      )}
      {modalUrediPredavaca && (
        <UrediPredavača
          teme={teme}
          organizacije={organizacije}
          currentPredavac={currentPredavac}
          setModalUrediPredavac={setModalUrediPredavac}
          setPredavaci={setPredavaci}
        />
      )}
    </div>
  );
}
