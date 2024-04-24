import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../predavaci.css";

export default function PredavacProfil() {
  const { id } = useParams();
  const [currentPredavac, setCurrentPredavac] = useState(null);
  const [radionice, setRadionice] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/predavaci/${id}`)
      .then((response) => {
        setCurrentPredavac(response.data);

        axios
          .get("http://localhost:3001/radionice")
          .then((r) => {
            const data = r.data.filter(
              (item) => item.predavac === response.data.ime
            );
            setRadionice(data);
          })
          .catch((error) => {
            console.error("Error fetching radionice:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching predavaci:", error);
      });
  }, [id]);

  return (
    <div>
      <h1>Profil predavača:</h1>
      {currentPredavac && (
        <div className="profil-div">
          <div className="profil-predavaca">
            <p>Ime: {currentPredavac.ime}</p>
            <p>Biografija: {currentPredavac.biografija}</p>
            <p>Organizacija:{currentPredavac.organizacija}</p>
            Teme:
            <ul>
              {currentPredavac.teme.map((r, index) => (
                <li key={index}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="radionice-profila">
            Radionice:
            {radionice.length === 0 ? (
              <p>Trenutno nema radionica :c</p>
            ) : (
              radionice.map((r) => (
                <div key={r.id} className="radionica-profil">
                  <p>{r.ime}</p>
                  <p>{r.opis}</p>
                  <p>{r.tezina}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
