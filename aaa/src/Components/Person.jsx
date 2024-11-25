import React, { useState } from "react";
import BlankAvatar from "../../../Dane/Blank-Avatar.png";
import "../Person.css";

export function Person({ dane }) {
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [rodzic1, setRodzic1] = useState("");
  const [rodzic2, setRodzic2] = useState("");
  const toggleModal = async () => {
    setModalOpen(!isModalOpen);
    const response = await fetch("http://localhost:3000/Show", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parent_id, parent_id2 }),
    });
    const data = await response.json();
    if (data.succes) {
      setRodzic1 = data.rodzic1;
      setRodzic2 = data.rodzic2;
    }
  };

  let img = photo ? photo : BlankAvatar;
  const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString();
  const formattedDateOfDeath = new Date(dateOfDeath).toLocaleDateString();
  const formattedDateOfUpdate = new Date(dateLastUpdated).toLocaleDateString();
  console.log(dane);
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
            <p>Dodatkowe informacje: {notes}</p>
            {/* <p>Identyfikatory dzieci: {children_ids}</p> */}
            <p>Ostatnio zaktualizowano {formattedDateOfUpdate}</p>
          </div>
        </div>
      )}
    </>
  );
}
