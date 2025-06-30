import React, { useEffect, useState } from "react";

// const API_BASE_URL = 'http://localhost:5000';

const API_BASE_URL = "https://portfolio-6-5icm.onrender.com" 
// const API_BASE_URL = "https://portfolio-0rl4.onrender.com


function Resume() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cv`)
      .then((res) => res.json())
      .then((data) => {
        setCvs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching CV data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center my-5">Loading CV data...</p>;
  if (!cvs.length) return <p className="text-center my-5">No CVs found.</p>;

  return (
    <div className="container my-5">
      <div className="row">
        {cvs.map((cv, idx) => (
          <div key={cv.id || idx} className="col-12 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                {/* Header */}
                {(cv.name || cv.title) && (
                  <header className="mb-4 border-bottom pb-2">
                    {cv.name && (
                      <h1 className="card-title display-6 text-primary">{cv.name}</h1>
                    )}
                    {cv.title && <h2 className="h6 text-secondary">{cv.title}</h2>}
                  </header>
                )}

                {/* Contact Info */}
                {cv.contact && Object.keys(cv.contact).length > 0 && (
                  <section className="mb-4">
                    <h3 className="h6 border-bottom pb-1">Contact Information</h3>
                    <ul className="list-unstyled mb-0">
                      {Object.entries(cv.contact).map(([key, value]) =>
                        value ? (
                          <li key={key}>
                            <strong className="text-capitalize">{key}:</strong> {value}
                          </li>
                        ) : null
                      )}
                    </ul>
                  </section>
                )}

                {/* Objective */}
                {(cv.objective && (Array.isArray(cv.objective) ? cv.objective.length > 0 : cv.objective)) && (
                  <section className="mb-4">
                    <h3 className="h6 border-bottom pb-1">Objective</h3>
                    {Array.isArray(cv.objective)
                      ? cv.objective.map((item, i) => item && <p key={i}>{item}</p>)
                      : <p>{cv.objective}</p>}
                  </section>
                )}

                {/* Experience */}
                {(cv.experience && Array.isArray(cv.experience) && cv.experience.length > 0) && (
                  <section className="mb-4">
                    <h3 className="h6 border-bottom pb-1">Experience</h3>
                    {cv.experience.map((job, i) => {
                      if (!job) return null;
                      const hasDetails = job.details && job.details.length > 0;
                      return (
                        <div key={i} className="mb-3">
                          {job.role && <h4 className="h6 text-primary">{job.role}</h4>}
                          {(job.company || job.date) && (
                            <p className="mb-1 fst-italic">
                              {job.company} {job.company && job.date ? " | " : ""} {job.date}
                            </p>
                          )}
                          {hasDetails && (
                            <ul>
                              {job.details.map((d, j) => d && <li key={j}>{d}</li>)}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </section>
                )}

                {/* Education */}
                {(cv.education && Array.isArray(cv.education) && cv.education.length > 0) && (
                  <section className="mb-4">
                    <h3 className="h6 border-bottom pb-1">Education</h3>
                    {cv.education.map((edu, i) => {
                      if (!edu) return null;
                      const { date, institution, note } = edu;
                      if (!date && !institution && !note) return null;
                      return (
                        <p key={i}>
                          {date && <>{date}<br /></>}
                          {institution && <strong>{institution}</strong>}<br />
                          {note && <>{note}</>}
                        </p>
                      );
                    })}
                  </section>
                )}

                {/* Projects */}
                {(cv.projects && Array.isArray(cv.projects) && cv.projects.length > 0) && (
                  <section className="mb-4">
                    <h3 className="h6 border-bottom pb-1">Projects</h3>
                    {cv.projects.map((proj, i) => {
                      if (!proj) return null;
                      return (
                        <div key={i} className="mb-3">
                          {proj.title && <h4 className="h6 text-primary">{proj.title}</h4>}
                          {typeof proj.details === "string" ? (
                            proj.details && <p>{proj.details}</p>
                          ) : (
                            proj.details && (
                              <ul>
                                {proj.details.map((d, j) => d && <li key={j}>{d}</li>)}
                              </ul>
                            )
                          )}
                        </div>
                      );
                    })}
                  </section>
                )}

                {/* Skills and Courses side by side on medium+ screens */}
                {( (cv.skills && cv.skills.length > 0) || (cv.courses && cv.courses.length > 0)) && (
                  <div className="row mb-4">
                    {cv.skills && cv.skills.length > 0 && (
                      <div className="col-12 col-md-6 mb-3">
                        <h3 className="h6 border-bottom pb-1">Skills</h3>
                        <ul className="list-inline">
                          {cv.skills.map((skill, i) => skill && (
                            <li key={i} className="list-inline-item badge bg-secondary me-2 mb-2">
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {cv.courses && cv.courses.length > 0 && (
                      <div className="col-12 col-md-6 mb-3">
                        <h3 className="h6 border-bottom pb-1">Courses</h3>
                        <ul className="list-inline">
                          {cv.courses.map((course, i) => course && (
                            <li key={i} className="list-inline-item badge bg-info text-dark me-2 mb-2">
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Languages */}
                {cv.languages && cv.languages.length > 0 && (
                  <section className="mb-4">
                    <h3 className="h6 border-bottom pb-1">Languages</h3>
                    <p>{cv.languages.filter(l => l).join(", ")}</p>
                  </section>
                )}

                {/* Volunteering */}
                {cv.volunteering && <section className="mb-4">
                  <h3 className="h6 border-bottom pb-1">Volunteering</h3>
                  <p>{cv.volunteering}</p>
                </section>}

                {/* Interests */}
                {cv.interests && <section className="mb-4">
                  <h3 className="h6 border-bottom pb-1">Interests</h3>
                  <p>{cv.interests}</p>
                </section>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resume;
