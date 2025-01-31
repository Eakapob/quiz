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
app.post("/bookstores/upload", (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "INSERT INTO bookstores (name, price, image_data) VALUES (?, ?, ?)";
  db.query(query, [name, price, image], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add book" });
    }
    res.status(201).json({ id: result.insertId, name, price, image });
  });
});

// กำหนดเส้นทางสำหรับการดึงข้อมูลของแต่ละ product
app.get('/bookstores/:id', (req, res) => {
  const { id } = req.params;  // ดึง id จาก URL
  
  // ดึงข้อมูล product ตาม id
  db.query('SELECT * FROM bookstores WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching product' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result[0]);  // ส่งข้อมูล product กลับไป
  });
});

// กำหนดเส้นทางสำหรับการอัปเดตข้อมูลของ product
app.put("/bookstores/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "UPDATE bookstores SET name = ?, price = ?, image_data = ? WHERE id = ?";
  db.query(query, [name, price, image, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update book" });
    }
    res.status(200).json({ message: "Book updated successfully" });
  });
});

// ลบหนังสือ
app.delete("/bookstores/:id", (req, res) => {
  const { id } = req.params; // Get ID from URL

  const query = "DELETE FROM bookstores WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete book" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
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
