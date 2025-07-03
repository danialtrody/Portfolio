const express = require("express");
const cors = require("cors");
const { fetch } = require('undici');

const createDBConnection = require('./db');
const pool = createDBConnection();

const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); 



//Contact page

app.get("/api/contact", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT contact.*, users.name
      FROM contact
      JOIN users ON contact.id = users.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/contact", async (req, res) => {
  const { firstname, lastname, email, country, subject } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO customer_request (firstname, lastname, email, country, subject)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [firstname, lastname, email, country, subject]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting contact data:", err.message);
    res.status(500).json({ error: err.message });
  }
});



//Project page
app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects", async (req, res) => {
  const { user_id, title, description, technologies, github, image } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO projects
      (user_id, title, description, technologies, github, image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [user_id, title, description, technologies, github, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting project:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    console.error("Error deleting project:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, technologies, github, image } = req.body;
  try {
    const result = await pool.query(
      `UPDATE projects SET
        title = $1,
        description = $2,
        technologies = $3,
        github = $4,
        image = $5,
        updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, description, technologies, github, image, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating project:", err.message);
    res.status(500).json({ error: err.message });
  }
});


//Home page
app.get("/api/home", async (req, res) => {
  try {
    const users = await pool.query(`
      SELECT users_card.*, users.name
      FROM users_card
      JOIN users ON users_card.id = users.id
    `);
    const media = await pool.query("SELECT * FROM media");
    res.json([media.rows, users.rows]); // still matches frontend expectations
  } catch (err) {
    console.error("Error fetching home data:", err.message);
    res.status(500).json({ error: err.message });
  }
});


//login page
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 1) {
      res.status(200).json({
        success: true, // ✅ Add this line
        message: "Login successful",
        user: result.rows[0]
      });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" }); // ✅ Add success: false
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


//icons
app.get("/api/icons", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, icon FROM tech_icons ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching icons:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// news page
app.get("/api/news", async (req, res) => {
  try {
    const response = await fetch("https://dev.to/api/articles?tag=technology");
    if (!response.ok) {
      throw new Error(`Dev.to API error: ${response.statusText}`);
    }
    const data = await response.json();
    res.json({ articles: data }); // ✅ IMPORTANT: wrap in articles key
  } catch (error) {
    console.error("Dev.to fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch tech news" });
  }
});


//CV Page
app.get("/api/cv", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cv");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// PUT: Update CV by ID
app.put('/api/cv/:id', async (req, res) => {
  const { id } = req.params;
  const cvData = req.body;


  const updateQuery = `
    UPDATE cv SET
      name = $1,
      title = $2,
      contact = $3,
      objective = $4,
      experience = $5,
      education = $6,
      projects = $7,
      courses = $8,
      languages = $9
    WHERE id = $10
    RETURNING *;
  `;

  try {
    const result = await pool.query(updateQuery, [
      cvData.name,
      cvData.title,
      JSON.stringify(cvData.contact || null),
      JSON.stringify(cvData.objective || null),
      JSON.stringify(cvData.experience || null),
      JSON.stringify(cvData.education || null),
      JSON.stringify(cvData.projects || null),
      JSON.stringify(cvData.courses || null),
      JSON.stringify(cvData.languages || null),
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "CV not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database update failed:", err);
    res.status(500).json({ error: 'Database update failed' });
  }
});



// CustomerRequests page
app.get("/api/admin/customerMessages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customer_request");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete request
app.delete("/api/admin/customerMessages/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM customer_request WHERE id = $1", [id]);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});



// --- START SERVER ---
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});