const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const port = 3000;
const cookies = require("cookie-parser");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Dane/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
let name = "";
let loggedId = null;
app.use("/Dane", express.static(path.join(__dirname, "Dane")));
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

app.delete("/deletePerson/:id", (req, res) => {
  const personId = req.params.id;

  const query = `DELETE FROM ancestors WHERE person_id = ?`;
  connection.query(query, [personId], (error, result) => {
    if (error) {
      console.error(error);
      res.json({ success: false, message: "Database error", error });
    } else {
      res.json({ success: true });
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

app.post("/Add", upload.single("photo"), (req, res) => {
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
  let photo = req.file ? req.file.filename : "None";
  if (!dateD) dateD = null;
  if (!occupation) occupation = "Nieznane/brak";
  if (!middleName) middleName = "Nieznane/brak";
  if (!placeOfDeath) placeOfDeath = "Jeszcze Nieznane";
  if (!placeOfBirth) placeOfBirth = "Nieznane";
  if (!parrent1) parrent1 = 0;
  if (!parrent2) parrent2 = 0;
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const query = `INSERT INTO ancestors (person_id, user_id, name, middle_name, surname, dateOfBirth, dateOfDeath, gender, placeOfBirth, placeOfDeath, occupation, notes, parent_id, parent_id2, photo, dateLastUpdated, children_ids) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [
      loggedId,
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
      photo,
      currentDate,
      "0",
    ],
    (error, result) => {
      if (error) {
        console.error(error);
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
