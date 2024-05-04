import { useState, useEffect } from "react";
import axios from "axios";

export default function FilterPredavaci({
  filterTeme,
  filterOrganizacija,
  setFilterTeme,
  setFilterOrganizacija,
  teme,
  organizacije,
}) {
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
  const handleOrganizationChange = (e) => {
    //if the checkbox was un-checked
    if (!filterOrganizacija.includes(e.target.value))
      setFilterOrganizacija((prevData) => [...prevData, e.target.value]);
    else {
      setFilterOrganizacija((prevData) =>
        prevData.filter((item) => item !== e.target.value)
      );
    }
  };

  return (
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
      <p
        style={{
          fontSize: "30px",
          color: "rgb(25, 100, 126)",
        }}
      >
        Filtriraj organizacije:
      </p>
      <div>
        {organizacije.map((r) => (
          <div key={r.id} className="checkbox-container">
            <input
              type="checkbox"
              id={r.id}
              name="tema"
              value={r.ime}
              onChange={handleOrganizationChange}
            />
            <label htmlFor={r.id}>{r.ime}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
