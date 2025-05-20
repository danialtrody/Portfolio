const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 5000;

const projectsFile = 'projects.json';
const contactsFile = 'contact.json';
const homeFile = 'home.json';
const customerRequest = "customerRequest.json"

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
  const newProject = { id: Date.now(),
    createdAt: new Date().toISOString() ,
     ...req.body };
  projects.push(newProject);
  writeJSON(projectsFile, projects);
  res.status(201).json(newProject);
});

// DELETE מחיקת פרויקט לפי ID
app.delete("/api/projects/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let projects = readJSON(projectsFile);
    const exists = projects.some(p => p.id === id);
    if (!exists) {
      return res.status(404).json({ error: "Project not found" });
    }
    projects = projects.filter(project => project.id !== id);
    writeJSON(projectsFile, projects);
    res.status(200).json({ message: "Project deleted" });
  });
  
  // PUT עדכון פרויקט לפי ID
  app.put("/api/projects/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let projects = readJSON(projectsFile);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Project not found" });
    }
    const updatedProject = {
        ...projects[index],
        ...req.body,
        updatedAt: new Date().toISOString()  // מוסיפים תאריך עדכון
      };
    projects[index] = updatedProject;
    writeJSON(projectsFile, projects);
    res.json(updatedProject);
  });


// --- HOME ROUTE ---
app.get("/api/home", (req, res) => {
  const home = readJSON(homeFile);
  res.json(home);
});



// --- CONTACT ROUTE ---
app.get("/api/contact", (req, res) => {
  const contacts = readJSON(contactsFile);
  res.json(contacts);
});


app.post("/api/contact", (req, res) => {
  const newData = req.body;
  const existing = readJSON(customerRequest);
  existing.push({
    id: Date.now(),
    ...newData
  });
  writeJSON(customerRequest, existing);
  res.send('Saved successfully!');
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
