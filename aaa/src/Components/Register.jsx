import { useState } from "react";
import { useNavigate } from "react-router-dom";

function validatePassword(password) {
  const minLength = /.{8,}/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const isValid =
    minLength.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasNumber.test(password);
  return isValid;
}

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState("");
  const [display, setDisplay] = useState("none");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (password != repetPassword) {
      setErrorMessage("Hasła nie są takie same");
      setRepeatPassword("");
    } else if (!validatePassword(password)) {
      setErrorMessage(
        "Hasło powinno zawierać przynajmniej: jedną mała literę, jedną dużą literę, jedną cyfrę i mieć minimum 8 znaków "
      );
    } else {
      setErrorMessage("");
      const response = await fetch("http://localhost:3000/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setResponse("Udało sie stowrzyć konto");
        setDisplay("inline");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
      if (data.occupied) {
        setErrorMessage(
          "Rejestracja nie powiodła się taki użytkownik już istnieje"
        );
        setUsername("");
      }
    }
  };

  return (
    <div className="Formularz">
      <h2>Stwórz swoje nowe drzewo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nazwa użytkownika"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
        />
        <br />
        <input
          type="password"
          value={repetPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder="Powtórz Hasło"
        />
        <br />
        <button type="submit">Rejestracja</button> <br />
        Masz już konto? <a href="/">Zaloguj się!</a>
        <br />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <br />
        <p style={{ color: "green" }}>{response}</p>
        <br />
      </form>
      <button style={{ display: display }} onClick={() => navigate("/")}>
        Przejdź do logowania
      </button>
    </div>
  );
}
