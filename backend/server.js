const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost", // host name
  user: "root", // user name
  password: "", // password
  database: "bookstore", // database name
});

const upload = multer({ dest: "uploads/" }); // Adjust the destination as needed

//fetch book
app.get("/bookstores", (req, res) => {
  db.query("SELECT * FROM bookstores", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// POST route to add a book with image upload
app.post("/bookstores/upload", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file;

  if (!name || !price || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "INSERT INTO bookstores (name, price, image) VALUES (?, ?, ?)";
  db.query(query, [name, price, image.filename], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add book" });
    }
    res.status(201).json({ id: result.insertId, name, price, image: image.filename });
  });
});

app.listen("3001", () => {
  console.log("server is running on port 3001");
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
  }
});

