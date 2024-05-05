import RedakTablice from "./RedakTablice";

export default function Tablica({ result, stupci, ime, set }) {
  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            {stupci.map((stupac, index) => (
              <th key={index}>{stupac.label}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {result.map((item) => (
            <RedakTablice
              key={item.id}
              item={item}
              stupci={stupci}
              ime={ime}
              set={set}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
