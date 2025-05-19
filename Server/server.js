const express = require("express");
const cors = require("cors");
const fs = require("fs"); // Make sure this is included!

const app = express();
const port = 5000;
const projectsFile = 'projects.json';

app.use(cors());
app.use(express.json()); // Enable reading JSON from body

// Helper function to read projects from the file
function readProjects() {
  if (!fs.existsSync(projectsFile)) {
    fs.writeFileSync(projectsFile, JSON.stringify([])); // create file if not exists
  }
  const data = fs.readFileSync(projectsFile);
  return JSON.parse(data);
}

// Helper function to write projects to the file
function writeProjects(data) {
  fs.writeFileSync(projectsFile, JSON.stringify(data, null, 2));
}

// ✅ GET projects - returns projects from the file
app.get("/api/projects", (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

// ✅ POST projects - adds a new project
app.post("/api/projects", (req, res) => {
  const projects = readProjects();
  const newProject = { id: Date.now(), ...req.body };
  projects.push(newProject);
  writeProjects(projects);
  res.status(201).json(newProject);
});

// Other APIs (contact and home)
const contactData = [
  {
    id: 1,
    name: "Danial Trody",
    email: "trody2001@gmail.com",
    phone: "+972 0545361151",
    location: "Haifa, Israel",
    linkedin: "https://www.linkedin.com/in/danialtrody",
    github: "https://github.com/danialtrody"
  },
  {
    id: 2,
    name: "Muhammad Egbaria",
    email: "mhmad.m.ig2001@gmail.com",
    phone: "+972 0587797724",
    location: "Haifa, Israel",
    linkedin: "https://www.linkedin.com/in/muhammad-egbaria",
    github: "https://github.com/muhammad-egbaria"
  }
];

const homeData = [
  [{
    image: 'https://verpex.com/assets/uploads/images/blog/How-to-become-a-Backend-Developer.jpg?v=1665484477',
    title: 'We Create Website And Application',
  }],
  [
    {
      id: 1,
      name: "Danial Trody",
      about: "Hi, I'm Danial — a passionate Web Developer specializing in frontend technologies like React. I love building responsive and interactive web apps.",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express"],
      interests: ["UI/UX Design", "Open Source", "Web Performance"],
    },
    {
      id: 2,
      name: "Muhammad Egbaria",
      about: "Hi, I'm Muhammad — a creative full-stack developer who enjoys solving real-world problems with scalable web apps.",
      skills: ["JavaScript", "TypeScript", "MongoDB", "Express", "React", "Node.js"],
      interests: ["Machine Learning", "APIs", "Backend Development"],
    }
  ]
];

app.get("/api/contact", (req, res) => {
  res.json(contactData);
});

app.get("/api/home", (req, res) => {
  res.json(homeData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
