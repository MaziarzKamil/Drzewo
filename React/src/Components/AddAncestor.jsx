import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../format.css";

export function AddAncestor() {
  const [dateB, setDateB] = useState("");
  const [dateD, setDateD] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [placeOfDeath, setPlaceOfDeath] = useState("");
  const [occupation, setOccupation] = useState("");
  const [parrent1, setParrent1] = useState("");
  const [parrent2, setParrent2] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState(null); // Dodanie stanu do przechowywania zdjęcia

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name || !surname || !dateB || !gender) {
      setErrorMessage("Brakuje kluczowych danych");
      return;
    }

    const formData = new FormData();
    formData.append("dateB", dateB);
    formData.append("dateD", dateD);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("middleName", middleName);
    formData.append("gender", gender);
    formData.append("placeOfBirth", placeOfBirth);
    formData.append("placeOfDeath", placeOfDeath);
    formData.append("occupation", occupation);
    formData.append("parrent1", parrent1);
    formData.append("parrent2", parrent2);
    formData.append("note", note);
    if (photo) {
      formData.append("photo", photo); // Dodanie zdjęcia do formData
    }

    try {
      const response = await fetch("http://localhost:3000/Add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        navigate("/mainPage");
      } else {
        setErrorMessage("Nie udało się");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Nie udało się");
    }
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
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
            required
          />
        </div>
        <div>
          <h3>Nazwisko:</h3>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Nazwisko"
            required
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
          <button type="button" onClick={() => setMiddleName("")}>
            Usuń
          </button>
        </div>
        <div>
          <h3>Płeć:</h3>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Płeć"
            required
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
          <button type="button" onClick={() => setPlaceOfDeath("")}>
            Usuń
          </button>
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
          <h3>Data urodzenia:</h3>
          <input
            type="date"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            required
          />
        </div>
        <div className="SelectDate">
          <h3>Data Śmierci:</h3>
          <input
            type="date"
            value={dateD}
            onChange={(e) => setDateD(e.target.value)}
          />
          <button type="button" onClick={() => setDateD("")}>
            Usuń
          </button>
        </div>
        <div>
          <h3>Zdjęcie:</h3>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button type="submit">Dodaj</button>
      </form>
    </>
  );
}
