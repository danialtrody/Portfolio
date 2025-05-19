const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 5000;

const projectsFile = 'projects.json';
const contactsFile = 'contact.json';
const homeFile = 'home.json';

app.use(cors());
app.use(express.json()); // Allow JSON body parsing

// --- Helper to read JSON files ---
function readJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([])); // initialize empty array if file doesn't exist
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// --- Helper to write JSON files ---
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- PROJECTS ROUTES ---
app.get("/api/projects", (req, res) => {
  const projects = readJSON(projectsFile);
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const projects = readJSON(projectsFile);
  const newProject = { id: Date.now(), ...req.body };
  projects.push(newProject);
  writeJSON(projectsFile, projects);
  res.status(201).json(newProject);
});

// --- CONTACT ROUTE ---
app.get("/api/contact", (req, res) => {
  const contacts = readJSON(contactsFile);
  res.json(contacts);
});

// --- HOME ROUTE ---
app.get("/api/home", (req, res) => {
  const home = readJSON(homeFile);
  res.json(home);
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
