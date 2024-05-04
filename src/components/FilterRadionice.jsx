import axios from "axios";
import { useEffect, useState } from "react";

export default function FilterRadionice({
  filterTeme,
  filterTezina,
  setFilterTezina,
  setFilterTeme,
}) {
  const [tezine, setTezine] = useState([]); // sve tezine sa json servera
  const [teme, setTeme] = useState([]); // sve teme sa json servera

  const tezineURL = "http://localhost:3001/tezine";
  const temeURL = "http://localhost:3001/teme";

  useEffect(() => {
    axios
      .get(tezineURL)
      .then((res) => setTezine(res.data))
      .catch((err) => alert(err));
    axios
      .get(temeURL)
      .then((res) => setTeme(res.data))
      .catch((err) => alert(err));
  }, []);

  const handleThemeChange = (e) => {
    //if the checkbox was un-checked
    if (!filterTeme.includes(e.target.value))
      setFilterTeme((prevData) => [...prevData, e.target.value]);
    else {
      setFilterTeme((prevData) =>
        prevData.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleDifficultyChange = (e) => {
    //if the checkbox was un-checked
    if (!filterTezina.includes(e.target.value))
      setFilterTezina((prevData) => [...prevData, e.target.value]);
    else {
      setFilterTezina((prevData) =>
        prevData.filter((item) => item !== e.target.value)
      );
    }
  };

  return (
    <div>
      <div className="filter">
        <p
          style={{
            fontSize: "30px",
            color: "rgb(25, 100, 126)",
          }}
        >
          Filtriraj teme:
        </p>
        <div>
          {teme.map((r) => (
            <div key={r.id} className="checkbox-container">
              <input
                type="checkbox"
                id={r.id}
                name="tema"
                value={r.ime}
                onChange={handleThemeChange}
              />
              <label htmlFor={r.id}>{r.ime}</label>
            </div>
          ))}
        </div>
        <hr />
        <div>
          <p
            style={{
              fontSize: "30px",
              color: "rgb(25, 100, 126)",
            }}
          >
            Filtriraj težine:
          </p>
          {tezine.map((r) => (
            <div key={r.id} className="checkbox-container">
              <input
                type="checkbox"
                id={r.id}
                name="tema"
                value={r.ime}
                onChange={handleDifficultyChange}
              />
              <label htmlFor={r.id}>{r.ime}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
