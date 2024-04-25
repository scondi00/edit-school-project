import RedakTablice from "./RedakTablice";

export default function Tablica({ result, stupci }) {
  return (
    <div>
      <table>
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
            <RedakTablice key={item.id} item={item} stupci={stupci} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
