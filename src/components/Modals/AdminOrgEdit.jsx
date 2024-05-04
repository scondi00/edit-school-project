import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminOrgEdit({ item, setModalEdit, set }) {
  const [radionice, setRadionice] = useState([]);
  const [editOrg, setEditOrg] = useState({
    id: "",
    ime: "",
    opis: [],
    radionice: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/radionice")
      .then((r) => setRadionice(r.data))
      .catch((error) => alert(error));
  }, []);

  function formatData() {
    const data = {};

    // ako smo unijeli novu promjenu, formatiraj podatke za slanje
    if (editOrg.id !== "") {
      data.id = editOrg.id;
    }
    if (editOrg.ime !== "") {
      data.ime = editOrg.ime;
    }
    if (editOrg.opis !== "") {
      data.opis = editOrg.opis;
    }
    if (editOrg.radionice.length) {
      data.radionice = editOrg.radionice;
    }
    return data;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditOrg({ ...editOrg, [name]: value });
  };
  const handleOdabraneRadionice = (e) => {
    if (!editOrg.radionice.includes(e.target.value)) {
      setEditOrg((prevData) => ({
        ...prevData,
        radionice: [...prevData.radionice, e.target.value],
      }));
    } else {
      setEditOrg((prevData) => ({
        ...prevData,
        radionice: prevData.radionice.filter((item) => item !== e.target.value),
      }));
    }
  };

  async function postIzmjenu(e) {
    e.preventDefault();

    if (window.confirm("Jeste li sigurni da želite spremiti promjene?")) {
      const promjeniPodatke = formatData();

      await axios
        .patch(`http://localhost:3001/organizacije/${item.id}`, promjeniPodatke)
        .then((r) => {
          setModalEdit(false);
          axios
            .get("http://localhost:3001/organizacije")
            .then((r) => {
              set(r.data);
            })
            .catch((err) => alert(err));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setModalEdit(false)}>X</button>
        <form onSubmit={postIzmjenu}>
          <div>
            Promjeni id:{" "}
            <input
              type="text"
              name="id"
              value={editOrg.id}
              onChange={handleChange}
            />
          </div>
          <div>
            Promjeni ime:{" "}
            <input
              type="text"
              name="ime"
              value={editOrg.ime}
              onChange={handleChange}
            />
          </div>
          <div>
            Promjeni opis:{" "}
            <input
              type="text"
              name="opis"
              value={editOrg.opis}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              {" "}
              Promjeni radionice:
              {radionice.map((r) => (
                <div key={r.id}>
                  <label>{r.ime}</label>
                  <input
                    type="checkbox"
                    name="teme"
                    value={r.ime}
                    onChange={handleOdabraneRadionice}
                  />
                </div>
              ))}
            </label>
          </div>
          <input type="submit" value="Spremi" />
        </form>
      </div>
    </div>
  );
}
