import { AdminContext } from "../App";
import { useContext } from "react";

export default function Radionica({
  result,
  setModal,
  setRadionicaPrijava,
  setModalUrediRadionicu,
}) {
  const { isAdmin, setAdmin } = useContext(AdminContext);

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
      <div style={{ display: "flex" }}>
        <img
          src={result.img}
          alt="logo-radionice"
          className="slika-radionice"
        />
        <div style={{ marginLeft: "30px" }}>
          <p style={{ fontSize: "40px" }}>{result.ime}</p>
          <p>Datum: {result.datum}</p>
          <p>Predavač: {result.predavac}</p>
          <details>
            <summary>Opis radionice:</summary>
            <p> {result.opis}</p>
          </details>
          <hr />

          {result.teme.map((r, index) => (
            <div key={index}>{r}</div>
          ))}
          <hr />
          <p>Broj prijava: {result.broj_prijava}</p>
        </div>
      </div>
      <div style={{ padding: "15px", display: "flex", justifyContent: "end" }}>
        <button className="prijava-btn" onClick={handlePrijavaClick}>
          Prijava
        </button>
        {isAdmin && (
          <button className="uredi-btn" onClick={handleUrediRadionicu}>
            Uredi radionicu
          </button>
        )}
      </div>
    </div>
  );
}
