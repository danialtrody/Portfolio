const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

const projectData = [
    {
        id:1,
        title: "Portfolio Website",
        description: "A personal portfolio site built with HTML, CSS, and JavaScript showcasing my web development skills.",
        technologies: "[HTML, CSS, JavaScript]",
        github: "https://github.com/danialtrody/Portfolio",
        image: "https://yourdomain.com/images/portfolio.png"
    },

    {
        id:2,
        title: "Task Manager App",
        description: "A full-stack task manager app with user authentication, allowing users to create, edit, and delete tasks.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/danialtrody/task-manager",
        github: "https://github.com/danialtrody/task-manager",
    }
]

const contactData = [
    {id:1 , name: "Danial Trody" , email:"trody2001@gmail.com"},
    {id:2 , name: "Muhammad Egbaria" , email:"mhmad.m.ig2001@gmail.com"}
]

const homeData = [
    {id:1 , about: "Hi, I'm Danial — a passionate Web Developer."},
    {id:2 , about: "Hi, I'm Muhammad — a passionate Web Developer."}

]



app.use(cors());

app.get("/api/projects", (req,res) => {
    res.json(projectData);
});

app.get("/api/contact", (req,res) => {
    res.json(contactData);
});

app.get("/api/home", (req,res) => {
    res.json(homeData);
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});