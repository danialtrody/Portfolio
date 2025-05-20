import React from "react";


function DualCV() {
  return (
    <div className="dual-cv-wrapper">
      {/* Danial Trody CV */}
      <div className="cv-panel">
        <h1 className="cv-name">Danial Trody</h1>
        <p className="cv-title">Final-Year Computer Science Student</p>

        <section>
          <h2>Contact Information</h2>
          <p>Email: <a href="mailto:trody2001@gmail.com">trody2001@gmail.com</a></p>
          <p>Location: Isfiya, Haifa, Israel</p>
          <p>Phone: 0545361151</p>
          <p>GitHub: <a href="https://github.com/danialtrody" target="_blank" rel="noreferrer">github.com/danialtrody</a></p>
        </section>

        <section>
          <h2>Objective</h2>
          <p>
            Highly motivated final-year Computer Science student with a solid
            academic background and hands-on experience in programming,
            algorithms, data structures, and web development.
          </p>
          <p>
            Eager to leverage my technical skills to solve complex problems
            and contribute to innovative projects, while growing professionally
            in a dynamic environment.
          </p>
        </section>

        <section>
          <h2>Experience</h2>
          <h3>Frontend Developer Internship (400 Hours)</h3>
          <p><strong>Fast Simon (Scholarship Program)</strong> | Aug 2024 - Mar 2025</p>
          <ul>
            <li>Participated in a scholarship program as a Frontend Developer, working on eCommerce store customization and bug fixes using JavaScript, HTML, and CSS.</li>
            <li>Gained practical experience with eCommerce platforms like Shopify, optimizing stores for better user experience.</li>
            <li>Resolved technical issues reported by clients and implemented custom solutions tailored to their specific needs.</li>
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          <p><strong>Tel-Hai Academic College</strong> | 2021 - Present</p>
        </section>

        <section>
          <h2>Projects</h2>
          <h3>To-Do Website Full-Stack Application</h3>
          <ul>
            <li>Developed a full-stack To-Do application using Node.js, Express, and JavaScript.</li>
            <li>The application enables users to register, log in, add, update, and delete tasks, with persistent data storage.</li>
            <li><a href="https://github.com/danialtrody/ToDo.git" target="_blank" rel="noreferrer">GitHub Repo</a></li>
          </ul>
        </section>

        <section>
          <h2>Skills</h2>
          <ul>
            <li>Quick learner</li>
            <li>Team work</li>
            <li>Self improvement</li>
          </ul>
        </section>

        <section>
          <h2>Courses</h2>
          <ul>
            <li>Html - CSS - JavaScript</li>
            <li>Python</li>
            <li>Linux</li>
            <li>C / C++ / C#</li>
            <li>Algorithm</li>
            <li>Java-OOP</li>
            <li>The Complete 2024 Web Development Bootcamp - <a href="https://www.udemy.com/course/the-complete-web-development-bootcamp/" target="_blank" rel="noreferrer">Udemy</a></li>
          </ul>
        </section>

        <section>
          <h2>Languages</h2>
          <p>Hebrew, Arabic, English</p>
        </section>
      </div>

      {/* Muhammad Egbaria CV */}
      <div className="cv-panel">
        <h1 className="cv-name">Muhammad Egbaria</h1>
        <p className="cv-title">Final-Year Computer Science Student</p>

        <section>
          <h2>Contact Information</h2>
          <p>Email: <a href="mailto:MuhWork2001@gmail.com">MuhWork2001@gmail.com</a></p>
          <p>Phone: 0587797724</p>
          <p>Address: Heifa-Ma'ale Iron, 3092000 Musheirifa</p>
          <p>GitHub: <a href="https://github.com/Muhammadegb1" target="_blank" rel="noreferrer">github.com/Muhammadegb1</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/muhammad-egbaria" target="_blank" rel="noreferrer">linkedin.com/in/muhammad-egbaria</a></p>
        </section>

        <section>
          <h2>Skills</h2>
          <ul>
            <li>Quick Learner</li>
            <li>Self Improvement</li>
            <li>Problem Solving</li>
          </ul>
        </section>

        <section>
          <h2>Languages</h2>
          <p>Arabic, Hebrew, English</p>
        </section>

        <section>
          <h2>Volunteering</h2>
          <p>
            Volunteered with Perach (2021–2024) as a mentor for 5th and 6th-grade students,
            helping to improve their academic performance and social skills.
          </p>
        </section>

        <section>
          <h2>Summary</h2>
          <p>
            Final-Year Computer Science Student at Tel-Hai College with a strong academic background and hands-on experience in React, Node.js, and SQL, with a strong foundation in algorithms and data structures. Proficient in languages such as JavaScript, C, C#, C++, Python, and Linux.
          </p>
        </section>

        <section>
          <h2>Education</h2>
          <p>Oct 2021 - Present</p>
          <p><strong>Tel-Hai Academic College</strong></p>
          <p>1 semester until graduation</p>
        </section>

        <section>
          <h2>Projects</h2>
          <h3>To-Do Website</h3>
          <p>
            To-Do List application using Node.js, Express, and JavaScript. The web-based task management app allows users to register, log in, and manage tasks by adding, updating, deleting, and saving them persistently, with user data and tasks stored in JSON files.
          </p>
          <h3>CourseGrader (C#)</h3>
          <p>
            Application designed to streamline the management of student assignments and grades. This application enables educators to efficiently import, view, edit, and save student grades for various courses. The application reads data from Excel files and saves all course-related information in JSON format for persistent storage, ensuring that the original Excel files remain unaltered.
          </p>
        </section>

        <section>
          <h2>Courses</h2>
          <ul>
            <li>Html - CSS - JavaScript</li>
            <li>Python</li>
            <li>Linux</li>
            <li>C / C++ / C#</li>
            <li>Algorithm</li>
            <li>Java-OOP</li>
            <li>The Complete 2024 Web Development Bootcamp - <a href="https://www.udemy.com/course/the-complete-web-development-bootcamp/" target="_blank" rel="noreferrer">Udemy</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DualCV;
