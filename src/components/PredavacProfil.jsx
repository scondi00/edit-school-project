import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css-files/predavaci.css";

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
      <div className="title">Profil predavača:</div>
      {currentPredavac && (
        <div className="profil-div">
          <div className="profil-predavaca">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={currentPredavac.img}
                alt="slika_predavaca"
                className="slike-predavac"
              />
            </div>
            <p
              style={{
                fontSize: "35px",
                color: "rgb(25, 100, 126)",
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {currentPredavac.ime}
            </p>
            <p style={{ color: "rgb(25, 100, 126)", fontSize: "20px" }}>
              Biografija:
            </p>
            <p>{currentPredavac.biografija}</p>
            <p style={{ display: "flex" }}>
              <div style={{ color: "rgb(25, 100, 126)", marginRight: "5px" }}>
                Organizacija:
              </div>
              {currentPredavac.organizacija}
            </p>
            <div style={{ color: "rgb(25, 100, 126)" }}>Teme:</div>

            <ul>
              {currentPredavac.teme.map((r, index) => (
                <li key={index}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="profil-radionice-div">
            {radionice.length === 0 ? (
              <div className="no-radionice">
                <p>Predavač trenutno nema radionice. </p>
                <p>:c</p>
              </div>
            ) : (
              radionice.map((r) => (
                <div key={r.id} className="radionica-profil">
                  <p
                    style={{
                      fontSize: "20px",
                      color: "rgb(25, 100, 126)",
                      fontWeight: "bold",
                    }}
                  >
                    {r.ime}
                  </p>
                  <p>{r.opis}</p>
                  <p style={{ display: "flex" }}>
                    <div
                      style={{ color: "rgb(25, 100, 126)", marginRight: "5px" }}
                    >
                      Težina radionice:
                    </div>
                    {r.tezina}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
