const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

const projectData = [
    {
        id:1,
        title: "Data Structures Implementations",
        description: "A comprehensive collection of classic data structure implementations.",
        technologies: "Java",
        github: "https://github.com/danialtrody/Data-Structures-Implementations",
        image: "dataStructure.png"
    },

    {
        id:2,
        title: "Task Manager App",
        description: "A full-stack task manager app with user authentication, allowing users to create, edit, and delete tasks.",
        technologies: "[React, Node.js, Express, MongoDB]",
        github: "https://github.com/danialtrody/ToDo",
        image: "/TODO.png"
    },

    {
        id: 3,
        title: "Background Generator",
        description: "A simple web app to generate CSS gradient backgrounds with live preview.",
        technologies: "[HTML, CSS, JavaScript]",
        github: "https://github.com/danialtrody/Background-generator",
        image: "/background-generator.png"
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