export default function RedakTablice({ item, stupci }) {
  return (
    <tr>
      {stupci.map((stupac, index) => (
        <td key={index}>{item[stupac.variable]}</td>
      ))}
      <td>uredi</td>
      <td>izbrisi</td>
    </tr>
  );
}
