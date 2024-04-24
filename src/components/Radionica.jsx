import { AdminContext } from "../App";
import { useContext } from "react";

export default function Radionica({
  result,
  setModal,
  setRadionicaPrijava,
  setModalUrediRadionicu,
}) {
  const isAdmin = useContext(AdminContext);

  const handlePrijavaClick = () => {
    setModal(true);
    setRadionicaPrijava(result);
  };

  const handleUrediRadionicu = () => {
    setModalUrediRadionicu(true);
    setRadionicaPrijava(result);
  };

  return (
    <div className="radionica">
      <img src={result.img} alt="logo-radionice" className="slika-radionice" />
      <p>{result.ime}</p>
      <p>{result.datum}</p>
      <p>Predavac: {result.predavac}</p>
      <p>Opis radionice: {result.opis}</p>
      <hr />
      {result.teme.map((r, index) => (
        <p key={index}>{r}</p>
      ))}
      <hr />
      <p>Broj prijava: {result.broj_prijava}</p>
      <button onClick={handlePrijavaClick}>Prijava</button>
      {isAdmin && (
        <button onClick={handleUrediRadionicu}>Napravi promjene</button>
      )}
    </div>
  );
}
