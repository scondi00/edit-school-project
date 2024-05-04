import { AdminContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Predavac({
  result,
  setCurrentPredavac,
  setModalUrediPredavac,
}) {
  const { isAdmin, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleUrediPredavaca = () => {
    setCurrentPredavac(result);
    setModalUrediPredavac(true);
  };

  const pregledajRadionice = () => {
    navigate(`/predavaci/${result.id}`);
  };

  return (
    <div className="predavac">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          className="slike-predavac"
          src={result.img}
          alt="slika_predavaca"
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
        {result.ime}
      </p>
      <p>Biografija: {result.biografija}</p>
      <p>Organizacija: {result.organizacija}</p>
      <hr />
      <div style={{ textAlign: "center" }}>
        {result.teme.map((r, index) => (
          <div
            key={index}
            style={{
              display: "inline",
              color: "rgb(25, 100, 126)",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            {r} /
          </div>
        ))}
      </div>
      <br />
      <hr />
      <div style={{ textAlign: "center" }}>
        <button className="pregled-btn" onClick={pregledajRadionice}>
          Pregled radionica
        </button>
        {isAdmin && (
          <div>
            <button className="uredi-btn" onClick={handleUrediPredavaca}>
              Uredi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
