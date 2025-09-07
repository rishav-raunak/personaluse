require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));



// API: Add a new card
app.post("/api/add", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    await pool.query("INSERT INTO cards (content) VALUES ($1)", [content]);
    res.json({ success: true, message: "Card added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
});

// API: Get all cards
app.get("/api/get", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cards ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





