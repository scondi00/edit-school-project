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
      <div className="radionice-filter">
        Filtriraj teme:
        <div>
          {teme.map((r) => (
            <div key={r.id}>
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
          Filtriraj težinu:
          {tezine.map((r) => (
            <div key={r.id}>
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
