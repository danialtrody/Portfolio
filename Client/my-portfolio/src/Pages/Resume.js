import React from "react";

// Step 1: Data structure for both CVs
const cvsData = [
  {
    name: "Danial Trody",
    title: "Final-Year Computer Science Student",
    contact: {
      email: "trody2001@gmail.com",
      location: "Isfiya, Haifa, Israel",
      phone: "0545361151",
      github: "https://github.com/danialtrody",
    },
    objective: [
      `Highly motivated final-year Computer Science student with a solid
      academic background and hands-on experience in programming,
      algorithms, data structures, and web development.`,
      `Eager to leverage my technical skills to solve complex problems
      and contribute to innovative projects, while growing professionally
      in a dynamic environment.`,
    ],
    experience: [
      {
        role: "Frontend Developer Internship (400 Hours)",
        company: "Fast Simon (Scholarship Program)",
        date: "Aug 2024 - Mar 2025",
        details: [
          "Participated in a scholarship program as a Frontend Developer, working on eCommerce store customization and bug fixes using JavaScript, HTML, and CSS.",
          "Gained practical experience with eCommerce platforms like Shopify, optimizing stores for better user experience.",
          "Resolved technical issues reported by clients and implemented custom solutions tailored to their specific needs.",
        ],
      },
    ],
    education: [
      {
        institution: "Tel-Hai Academic College",
        date: "2021 - Present",
        note: "1 semester until graduation",
      },
    ],
    projects: [
      {
        title: "To-Do Website Full-Stack Application",
        details: [
          "Developed a full-stack To-Do application using Node.js, Express, and JavaScript.",
          "The application enables users to register, log in, add, update, and delete tasks, with persistent data storage.",
          <a key="github" href="https://github.com/danialtrody/ToDo.git" target="_blank" rel="noreferrer">GitHub Repo</a>,
        ],
      },
    ],
    skills: ["Quick learner", "Team work", "Self improvement"],
    courses: [
      "Html - CSS - JavaScript",
      "Python",
      "Linux",
      "C / C++",
      "Algorithm",
      "Java-OOP",
      <a key="udemy" href="https://www.udemy.com/course/the-complete-web-development-bootcamp/" target="_blank" rel="noreferrer">The Complete 2024 Web Development Bootcamp - Udemy</a>,
    ],
    languages: ["Hebrew", "Arabic", "English"],
  },
  {
    name: "Muhammad Egbaria",
    title: "Final-Year Computer Science Student",
    contact: {
      email: "MuhWork2001@gmail.com",
      phone: "0587797724",
      address: "Heifa-Ma'ale Iron, 3092000 Musheirifa",
      github: "https://github.com/Muhammadegb1",
      linkedin: "https://linkedin.com/in/muhammad-egbaria",
    },
    skills: ["Quick Learner", "Self Improvement", "Problem Solving"],
    languages: ["Arabic", "Hebrew", "English"],
    volunteering: `Volunteered with Perach (2021–2024) as a mentor for 5th and 6th-grade students,
      helping to improve their academic performance and social skills.`,
    summary: `Final-Year Computer Science Student at Tel-Hai College with a strong academic background and hands-on experience in React, Node.js, and SQL, with a strong foundation in algorithms and data structures. Proficient in languages such as JavaScript, C, C#, C++, Python, and Linux.`,
    education: [
      {
        date: "Oct 2021 - Present",
        institution: "Tel-Hai Academic College",
        note: "1 semester until graduation",
      },
    ],
    projects: [
      {
        title: "To-Do Website",
        details: `To-Do List application using Node.js, Express, and JavaScript. The web-based task management app allows users to register, log in, and manage tasks by adding, updating, deleting, and saving them persistently, with user data and tasks stored in JSON files.`,
      },
      {
        title: "CourseGrader (C#)",
        details: `Application designed to streamline the management of student assignments and grades. This application enables educators to efficiently import, view, edit, and save student grades for various courses. The application reads data from Excel files and saves all course-related information in JSON format for persistent storage, ensuring that the original Excel files remain unaltered.`,
      },
    ],
    courses: [
      "Html - CSS - JavaScript",
      "Python",
      "Linux",
      "C / C++ / C#",
      "Algorithm",
      "Java-OOP",
      <a key="udemy" href="https://www.udemy.com/course/the-complete-web-development-bootcamp/" target="_blank" rel="noreferrer">The Complete 2024 Web Development Bootcamp - Udemy</a>,
    ],
  },
];

// Step 2: Component to render one CV panel
function CVPanel({ cv }) {

  
  return (
    <div className="cv-panel" style={{ flex: 1, border: "1px solid #ccc", padding: "1rem", borderRadius: "6px" }}>
      <h1 className="cv-name">{cv.name}</h1>
      <p className="cv-title">{cv.title}</p>

      {/* Contact Information */}
      <section>
        <h2>Contact Information</h2>
        {cv.contact.email && <p>Email: <a href={`mailto:${cv.contact.email}`}>{cv.contact.email}</a></p>}
        {cv.contact.location && <p>Location: {cv.contact.location}</p>}
        {cv.contact.phone && <p>Phone: {cv.contact.phone}</p>}
        {cv.contact.github && <p>GitHub: <a href={cv.contact.github} target="_blank" rel="noreferrer">{cv.contact.github.replace("https://", "")}</a></p>}
        {cv.contact.address && <p>Address: {cv.contact.address}</p>}
        {cv.contact.linkedin && <p>LinkedIn: <a href={cv.contact.linkedin} target="_blank" rel="noreferrer">{cv.contact.linkedin.replace("https://", "")}</a></p>}
      </section>

      {/* Objective */}
      {cv.objective && (
        <section>
          <h2>Objective</h2>
          {cv.objective.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>
      )}

      {/* Summary */}
      {cv.summary && (
        <section>
          <h2>Summary</h2>
          <p>{cv.summary}</p>
        </section>
      )}

      {/* Experience */}
      {cv.experience && (
        <section>
          <h2>Experience</h2>
          {cv.experience.map((job, i) => (
            <div key={i}>
              <h3>{job.role}</h3>
              <p><strong>{job.company}</strong> | {job.date}</p>
              <ul>
                {job.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {cv.education && (
        <section>
          <h2>Education</h2>
          {cv.education.map((edu, i) => (
            <p key={i}>
              {edu.date && <>{edu.date}<br/></>}
              {edu.institution && <strong>{edu.institution}</strong>}<br/>
              {edu.note && <>{edu.note}</>}
            </p>
          ))}
        </section>
      )}

      {/* Projects */}
      {cv.projects && (
        <section>
          <h2>Projects</h2>
          {cv.projects.map((proj, i) => (
            <div key={i}>
              <h3>{proj.title}</h3>
              {typeof proj.details === "string" ? (
                <p>{proj.details}</p>
              ) : (
                <ul>
                  {proj.details.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {cv.skills && (
        <section>
          <h2>Skills</h2>
          <ul>
            {cv.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Courses */}
      {cv.courses && (
        <section>
          <h2>Courses</h2>
          <ul>
            {cv.courses.map((course, i) => (
              <li key={i}>{course}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {cv.languages && (
        <section>
          <h2>Languages</h2>
          <p>{cv.languages.join(", ")}</p>
        </section>
      )}

      {/* Volunteering */}
      {cv.volunteering && (
        <section>
          <h2>Volunteering</h2>
          <p>{cv.volunteering}</p>
        </section>
      )}

      
    </div>
  );
}

// Step 3: Main DualCV component rendering both CVs from data
function DualCV() {
  return (
    <div className="dual-cv-wrapper" style={{ display: "flex", gap: "2rem" }}>
      {cvsData.map((cv, i) => (
        <CVPanel key={i} cv={cv} />
      ))}
    </div>
  );
}

export default DualCV;
