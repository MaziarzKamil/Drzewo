import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      navigate("/mainPage");
    } else {
      setErrorMessage("Logowanie nie powiodło się. Nieprawidłowe dane");
    }
  };

  return (
    <div className="Formularz">
      <h2>Zaloguj się do swojego Drzewa</h2>
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
        <button type="submit">Login</button> <br />
        Nie masz jeszcze konta? <a href="/Register">Załóż je tutaj</a>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
    </div>
  );
}
