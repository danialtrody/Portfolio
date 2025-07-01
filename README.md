💼 Danial Trody — Developer Portfolio
Welcome to my personal portfolio website! This project showcases my background, skills, and development work. It includes my resume, featured projects, and a contact form, along with a tech news section and admin login for content management.

🌐 Live Website
📍 Visit My Portfolio
## https://portfolio-5yr2.onrender.com ##


📸 Preview
![image](https://github.com/user-attachments/assets/dbb4e9a2-d5b3-42f2-8d44-9370e276446a)



🚀 Features
🧑‍💼 Resume Viewer with editable admin mode

📁 Project Gallery with add/edit/delete options (admin only)

📰 Tech News Feed powered by the Dev.to API

🔒 Admin Login system (admin/guest roles)

📨 Contact Form for user inquiries

🖼️ Tech Stack Icons management

📊 Database-Connected with PostgreSQL

🛠️ Tech Stack
Frontend:

React.js (Vite)

Bootstrap 5

HTML, CSS, JavaScript

Backend:

Node.js + Express

PostgreSQL

Render (Hosting)

Other:

RESTful API

html2pdf.js for PDF generation

nodemon for development

📦 Project Structure
bash
Copy
Edit
Portfolio/
├── Client/               # React frontend
│   ├── Components/       # Reusable UI components
│   ├── pages/            # Page components like Home, Projects, Resume
│   └── App.jsx           # Main App component
├── Server/               # Express server and PostgreSQL routes
│   ├── server.js         # Main backend server file
│   └── db.js             # PostgreSQL connection setup
├── README.md
└── package.json
🧪 Local Development
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/danialtrody/Portfolio.git
cd Portfolio
Set Up the Backend:

bash
Copy
Edit
cd Server
npm install
npm start
Set Up the Frontend:

bash
Copy
Edit
cd ../Client
npm install
npm run dev
Environment Variables:

Create a .env file (if needed) to configure API URLs.

🗃️ Database Schema Overview
users

cv

projects

customer_request (contact)

tech_icons

media

users_card

Each table is used to serve dynamic content throughout the website.

🔐 Admin Access
Login via /login page

Admin users can:

Edit CV

Add/remove projects

Update resume/contact info

Manage tech stack icons

🛡️ Security Note
Sensitive credentials (like database passwords) are not stored in the repo. Always use .env files or Render's environment settings.

🧠 Future Improvements
Add file uploads for projects and media

Rich text editor for admin content

Switch to TypeScript

Mobile responsiveness improvements

🙋‍♂️ About Me
I'm Danial Trody, a final-year Computer Science student passionate about web development, cybersecurity, and building high-performance applications.

📧 Email: trody2001@gmail.com
🔗 GitHub: danialtrody
