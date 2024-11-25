const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const cookies = require("cookie-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let name = "";
let loggedId = null;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "drzewo",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Połączono z bazą danych MySQL");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE login = ? AND password = ?";
  connection.query(query, [username, password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      name = results[0].login;
      loggedId = results[0].user_id;
      res.json({ success: true });
      console.log("Zalogowano ");
    } else {
      res.json({ success: false });
    }
  });
});

app.post("/Register", (req, res) => {
  const { username, password } = req.body;
  let query = "SELECT * FROM users WHERE login = ? ";
  connection.query(query, [username], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json({ occupied: true });
    } else {
      query =
        "INSERT INTO `users`(`user_id`, `login`, `password`) VALUES ('',?,?)";
      connection.query(query, [username, password], (error, results) => {
        if (error) {
          throw error;
        } else {
          res.json({ success: true });
        }
      });
    }
  });
});

app.get("/mainPage", async (req, res) => {
  const id = loggedId;
  const query = "SELECT * FROM `ancestors` WHERE user_id LIKE ?";
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    if (results.length > 0) {
      // Zwracamy dane w postaci tablicy obiektów
      res.json({ name: name, dane: results });
    } else {
      // Jeśli brak wyników, zwróć pustą tablicę
      res.json({ name: name, dane: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Błąd serwera");
  }
});

app.post("/Add", (req, res) => {
  let {
    dateB,
    dateD,
    name,
    surname,
    middleName,
    gender,
    placeOfBirth,
    placeOfDeath,
    occupation,
    parrent1,
    parrent2,
    note,
  } = req.body;
  if (!dateD) dateD = "Brak";
  if (!occupation) occupation = "Nieznane/brak";
  if (!middleName) middleName = "Nieznane/brak";
  if (!placeOfDeath) placeOfDeath = "Jeszcze Nieznane";
  if (!placeOfBirth) placeOfBirth = "Nieznane";
  if (!parrent1) parrent1 = 0;
  if (!parrent2) parrent2 = 0;
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const query = `INSERT INTO ancestors (person_id, user_id, name, middle_name, surname, dateOfBirth, dateOfDeath, gender, placeOfBirth, placeOfDeath, occupation, notes, parent_id, parent_id2, photo, dateLastUpdated, children_ids) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [
      loggedId, // Zamiast "1"
      name,
      middleName,
      surname,
      dateB,
      dateD,
      gender,
      placeOfBirth,
      placeOfDeath,
      occupation,
      note,
      parrent1,
      parrent2,
      "None",
      currentDate,
      "0",
    ],
    (error, result) => {
      if (error) {
        res.json({ success: false, message: "Database error", error });
      } else {
        res.json({ success: true });
      }
    }
  );
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
