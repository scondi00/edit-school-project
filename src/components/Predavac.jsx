import { AdminContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Predavac({
  result,
  setCurrentPredavac,
  setModalUrediPredavac,
}) {
  const isAdmin = useContext(AdminContext);
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
      <p>Predavac: {result.ime}</p>
      <p>Biografija: {result.biografija}</p>
      <p>Organizacija: {result.organizacija}</p>
      <hr />
      {result.teme.map((r, index) => (
        <p key={index}>{r}</p>
      ))}
      <br />
      <button onClick={pregledajRadionice}>Pregled radionica</button>
      {isAdmin && (
        <div>
          <button onClick={handleUrediPredavaca}>Uredi</button>
        </div>
      )}
    </div>
  );
}
