import React, { useState } from "react";
import BlankAvatar from "../../../Dane/Blank-Avatar.jpg"; // Upewnij się, że ścieżka do avatara jest poprawna
import "../Person.css";

export function Person({ dane }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/deletePerson/${dane.person_id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (result.success) {
        console.log("Osoba została usunięta.");
        setModalOpen(false);
        window.location.reload();
      } else {
        console.error("Nie udało się usunąć osoby.");
      }
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  const {
    name,
    middle_name,
    surname,
    dateOfBirth,
    dateOfDeath,
    gender,
    placeOfBirth,
    placeOfDeath,
    occupation,
    photo,
    notes,
    children_ids,
    dateLastUpdated,
    person_id,
    user_id,
    parent_id,
    parent_id2,
  } = dane;

  // Upewnij się, że ścieżka do zdjęcia jest poprawna
  let img = photo && photo !== "None" ? `../../../Dane/${photo}` : BlankAvatar;
  const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString();
  const formattedDateOfDeath = new Date(dateOfDeath).toLocaleDateString();
  const formattedDateLastUpdated = new Date(
    dateLastUpdated
  ).toLocaleDateString();
  console.log(img);
  return (
    <>
      <div className="profile" onClick={toggleModal}>
        <img src={img} alt="Avatar" className="profile-img" />
        <div className="profile-info">
          <h2>
            {name} <span>{middle_name}</span> {surname}
          </h2>
          <p>Płeć: {gender === "F" ? "Kobieta" : "Mężczyzna"}</p>
          <p>
            Miejsce urodzenia: {placeOfBirth}, Data urodzenia:{" "}
            {formattedDateOfBirth}
          </p>
          <p>Zawód: {occupation}</p>
          <p>
            Miejsce śmierci: {placeOfDeath}, Data śmierci:{" "}
            {formattedDateOfDeath}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Szczegółowe informacje o {name}</h2>
            <p>Imię: {name}</p>
            <p>Drugie imię: {middle_name}</p>
            <p>Nazwisko: {surname}</p>
            <p>Płeć: {gender === "F" ? "Kobieta" : "Mężczyzna"}</p>
            <p>Miejsce urodzenia: {placeOfBirth}</p>
            <p>Data urodzenia: {formattedDateOfBirth}</p>
            <p>Zawód: {occupation}</p>
            <p>Miejsce śmierci: {placeOfDeath}</p>
            <p>Data śmierci: {formattedDateOfDeath}</p>
            <p>Uwagi: {notes}</p>
            <p>Identyfikatory dzieci: {children_ids}</p>
            <p>Data ostatniej aktualizacji: {formattedDateLastUpdated}</p>
            <button className="delete-btn" onClick={handleDelete}>
              Usuń osobę
            </button>
          </div>
        </div>
      )}
    </>
  );
}
