import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { People } from "./People";
import "../MainPage.css"; // Upewnij się, że zaimportowałeś plik CSS

export function MainPage() {
  const [name, setName] = useState("");
  const [dane, setDane] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/mainPage")
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDane(data.dane);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="pasek">
        <h1>Witaj {name}</h1>
      </div>
      <div className="container">
        <div>
          <button onClick={() => navigate("/Add")}>
            Dodaj członka rodziny
          </button>
        </div>
        <People dane={dane} />
      </div>
    </>
  );
}
