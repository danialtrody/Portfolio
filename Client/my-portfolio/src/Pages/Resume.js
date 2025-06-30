import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";

// const API_BASE_URL = 'http://localhost:5000';

const API_BASE_URL = "https://portfolio-6-5icm.onrender.com" 
// const API_BASE_URL = "https://portfolio-0rl4.onrender.com


function Resume() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const cvRefs = useRef([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cv`)
      .then((res) => res.json())
      .then((data) => {
        setCvs(data);
        setLoading(false);
        cvRefs.current = new Array(data.length).fill(null);
      })
      .catch((err) => {
        console.error("Error fetching CV data:", err);
        setLoading(false);
      });
  }, []);

  const handleDownload = (index, name) => {
    const element = cvRefs.current[index];
    if (!element) return;

    html2pdf()
      .set({
        margin: 0.2,
        filename: `${name.replace(/\s+/g, "_")}_CV.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  if (loading) return <p className="text-center my-5">Loading CV data...</p>;
  if (!cvs.length) return <p className="text-center my-5">No CVs found.</p>;

  return (
    <div className="container my-5 resume-container">
      <div className="row">
        {cvs.map((cv, idx) => (
          <div key={cv.id || idx} className="col-12 col-md-6 mb-4">
            <div
              ref={(el) => (cvRefs.current[idx] = el)}
              className="card h-100 shadow-sm cv-container no-list-style"
            >
              <div className="card-body d-flex flex-column">
                {/* Download Button */}
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleDownload(idx, cv.name)}
                  >
                    Download as PDF
                  </button>
                </div>

                {/* CV Header */}
                <header className="mb-4 border-bottom pb-2">
                  <h1 className="card-title display-6 text-primary">{cv.name}</h1>
                  <h2 className="h6 text-secondary">{cv.title}</h2>
                </header>

                {/* Contact Info */}
                {cv.contact && typeof cv.contact === "object" && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Contact Information</h3>
                    <ul className="list-unstyled mb-0">
                      {Object.entries(cv.contact).map(([key, value]) => (
                        <li key={key}>
                          <strong className="text-capitalize">{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Objective */}
                {cv.objective && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Objective</h3>
                    {Array.isArray(cv.objective)
                      ? cv.objective.map((item, i) => <p key={i}>{item}</p>)
                      : <p>{cv.objective}</p>}
                  </section>
                )}

                {/* Experience */}
                {Array.isArray(cv.experience) && cv.experience.length > 0 && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Experience</h3>
                    {cv.experience.map((job, i) => (
                      <div key={i}>
                        <h4 className="h6 text-primary">{job.role}</h4>
                        <p className="mb-1"><em>{job.company} | {job.date}</em></p>
                        <ul>
                          {job.details && job.details.map((d, j) => <li key={j}>{d}</li>)}
                        </ul>
                      </div>
                    ))}
                  </section>
                )}

                {/* Education */}
                {Array.isArray(cv.education) && cv.education.length > 0 && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Education</h3>
                    {cv.education.map((edu, i) => (
                      <p key={i}>
                        {edu.date && <>{edu.date}<br /></>}
                        {edu.institution && <strong>{edu.institution}</strong>}<br />
                        {edu.note && <>{edu.note}</>}
                      </p>
                    ))}
                  </section>
                )}

                {/* Projects */}
                {Array.isArray(cv.projects) && cv.projects.length > 0 && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Projects</h3>
                    {cv.projects.map((proj, i) => (
                      <div key={i}>
                        <h4 className="h6 text-primary">{proj.title}</h4>
                        {Array.isArray(proj.details)
                          ? <ul>{proj.details.map((d, j) => <li key={j}>{d}</li>)}</ul>
                          : <p>{proj.details}</p>}
                      </div>
                    ))}
                  </section>
                )}

                {/* Skills & Courses */}
                <div className="row mb-3">
                  {Array.isArray(cv.skills) && (
                    <div className="col-12 col-md-6">
                      <h3 className="h6 border-bottom pb-1">Skills</h3>
                      <ul className="list-inline">
                        {cv.skills.map((skill, i) => (
                          <li key={i} className="list-inline-item badge bg-secondary me-1 mb-1">{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(cv.courses) && (
                    <div className="col-12 col-md-6">
                      <h3 className="h6 border-bottom pb-1">Courses</h3>
                      <ul className="list-inline">
                        {cv.courses.map((course, i) => (
                          <li key={i} className="list-inline-item badge text-dark me-1 mb-1">{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {Array.isArray(cv.languages) && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Languages</h3>
                    <p>{cv.languages.join(", ")}</p>
                  </section>
                )}

                {/* Volunteering */}
                {cv.volunteering && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Volunteering</h3>
                    <p>{cv.volunteering}</p>
                  </section>
                )}

                {/* Interests */}
                {cv.interests && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Interests</h3>
                    <p>{cv.interests}</p>
                  </section>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resume;
