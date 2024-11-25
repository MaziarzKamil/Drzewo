import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../format.css";

export function AddAncestor() {
  const [dateB, setDateB] = useState("");
  const [dateD, setDateD] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gander, setGander] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [placeOfDeath, setPlaceOfDeath] = useState("");
  const [occupation, setOccupation] = useState("");
  const [parrent1, setParrent1] = useState("");
  const [parrent2, setParrent2] = useState("");
  const [note, setNote] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (!name && !surname && !dateB && !gander) {
      setErrorMessage("Brakuje kluczowych danych");
    }
    {
      const requestData = {
        dateB,
        dateD,
        name,
        surname,
        middleName,
        gander,
        placeOfBirth,
        placeOfDeath,
        occupation,
        parrent1,
        parrent2,
        note,
      };
      const response = await fetch("http://localhost:3000/Add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ requestData }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/mainPage");
      } else {
        setErrorMessage("Nie udało się");
      }
      //console.log(dateB);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <h3>Imię:</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Imię"
          />
        </div>
        <div>
          <h3>Nazwisko:</h3>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Nazwisko"
          />
        </div>
        <div>
          <h3>Drugie imię:</h3>
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Drugie imię"
          />
          <button onClick={() => setMiddleName("")}>Usuń</button>
        </div>
        <div>
          <h3>Płeć:</h3>
          <input
            type="text"
            value={gander}
            onChange={(e) => setGander(e.target.value)}
            placeholder="Płeć"
          />
        </div>
        <div>
          <h3>Miejsce urodzenia:</h3>
          <input
            type="text"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            placeholder="Miejsce urodzenia"
          />
        </div>
        <div>
          <h3>Miejsce śmierci:</h3>
          <input
            type="text"
            value={placeOfDeath}
            onChange={(e) => setPlaceOfDeath(e.target.value)}
            placeholder="Miejsce śmierci"
          />
          <button onClick={() => setPlaceOfDeath("")}>Usuń</button>
        </div>
        <div>
          <h3>Zawód:</h3>
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="Zawód"
          />
        </div>
        <div>
          <h3>Rodzic 1:</h3>
          <input
            type="text"
            value={parrent1}
            onChange={(e) => setParrent1(e.target.value)}
            placeholder="Rodzic 1"
          />
        </div>
        <div>
          <h3>Rodzic 2:</h3>
          <input
            type="text"
            value={parrent2}
            onChange={(e) => setParrent2(e.target.value)}
            placeholder="Rodzic 2"
          />
        </div>
        <div>
          <h3>Notatka:</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Notatka"
            className="large-textarea"
          />
        </div>
        <div className="SelectDate">
          <h3> Data urodzenia</h3>
          <input
            type="date"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
          />
        </div>
        <div className="SelectDate">
          <h3> Data Śmierci</h3>
          <input
            type="date"
            value={dateD}
            onChange={(e) => setDateD(e.target.value)}
          />
          <button onClick={() => setDateD("")}>Usuń</button>
        </div>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button type="submit">Dodaj</button>
      </form>
    </>
  );
}
