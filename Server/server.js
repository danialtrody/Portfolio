const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

const projectData = [
    {id:1, title: "project 1", description: " Description of project 1" },
    {id:2, title: "project 2", description: " Description of project 2" }
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