import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useAuth } from '../Components/AuthContext';


// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://portfolio-6-5icm.onrender.com" 
// const API_BASE_URL = "https://portfolio-0rl4.onrender.com

function Resume() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const cvRefs = useRef([]);
  const { isAdmin } = useAuth();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  const hasValue = (field) => {
    if (field == null) return false;
    if (typeof field === "string") {
      const v = field.trim().toLowerCase();
      return v && v !== "null" && v !== "undefined";
    }
    if (Array.isArray(field)) return field.some(hasValue);
    if (typeof field === "object") return Object.values(field).some(hasValue);
    return true;
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setEditData(cvs.find(c => c.id === id));
  };

  const handleCancel = () => { setEditingId(null); setEditData(null); };
  const handleChange = (field, value) => setEditData(prev => ({ ...prev, [field]: value }));

  const handleSave = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cv/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Failed to save');
      const updatedCv = await res.json();
      setCvs(cvs.map(cv => (cv.id === id ? updatedCv : cv)));
      setEditingId(null);
      setEditData(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save CV data.');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cv`)
      .then(res => res.json())
      .then(data => {
        setCvs(data);
        setLoading(false);
        cvRefs.current = Array(data.length).fill(null);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const handleDownload = (index, name) => {
    const el = cvRefs.current[index];
    if (!el) return;
    html2pdf()
      .set({
        margin: 0.2,
        filename: `${name.replace(/\s+/g, "_")}_CV.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
      })
      .from(el)
      .save();
  };

  if (loading) return <p className="text-center my-5">Loading CV data...</p>;
  if (!cvs.length) return <p className="text-center my-5">No CVs found.</p>;

  const isEditing = (id) => editingId === id && isAdmin;

  return (
    <div className="container my-5 resume-container">
      <div className="row">
        {cvs.map((cv, idx) => (
          <div key={cv.id || idx} className="col-12 col-md-6 mb-4">
            <div ref={el => (cvRefs.current[idx] = el)} className="card h-100 shadow-sm cv-container no-list-style">
              <div className="card-body d-flex flex-column">
                {/* Buttons */}
                <div className="d-flex justify-content-end mb-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleDownload(idx, cv.name)}>
                    Download as PDF
                  </button>

                  {isAdmin && editingId !== cv.id && (
                    <button className="btn btn-sm btn-outline-secondary ms-3" onClick={() => handleEdit(cv.id)}>
                      Edit
                    </button>
                  )}
                  {isAdmin && editingId === cv.id && (
                    <>
                      <button className="btn btn-sm btn-success ms-3" onClick={() => handleSave(cv.id)}>Save</button>
                      <button className="btn btn-sm btn-danger ms-2" onClick={handleCancel}>Cancel</button>
                    </>
                  )}
                </div>

                {/* Header */}
                <header className="mb-4 border-bottom pb-2">
                  {isEditing(cv.id) ? (
                    <>
                      <input type="text" className="form-control mb-2" placeholder="Name" value={editData.name || ""} onChange={e => handleChange("name", e.target.value)} />
                      <input type="text" className="form-control" placeholder="Title" value={editData.title || ""} onChange={e => handleChange("title", e.target.value)} />
                    </>
                  ) : (
                    <>
                      {hasValue(cv.name) && <h1 className="card-title display-6 text-primary">{cv.name}</h1>}
                      {hasValue(cv.title) && <h2 className="h6 text-secondary">{cv.title}</h2>}
                    </>
                  )}
                </header>

                {/* Contact */}
                {hasValue(cv.contact) && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Contact Information</h3>
                    {isEditing(cv.id) ? (
                      <textarea
                        rows={4}
                        className="form-control"
                        value={JSON.stringify(editData.contact || {}, null, 2)}
                        onChange={e => {
                          try { handleChange("contact", JSON.parse(e.target.value)); } catch {}
                        }}
                      />
                    ) : (
                      <ul className="list-unstyled mb-0">
                        {Object.entries(cv.contact).map(([k, v]) => <li key={k}><strong className="text-capitalize">{k}:</strong> {v}</li>)}
                      </ul>
                    )}
                  </section>
                )}

                {/* Objective */}
                {hasValue(cv.objective) && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Objective</h3>
                    {isEditing(cv.id) ? (
                      <textarea
                        rows={3}
                        className="form-control"
                        value={Array.isArray(editData.objective) ? editData.objective.join("\n") : editData.objective || ""}
                        onChange={e => {
                          const lines = e.target.value.split("\n").filter(Boolean);
                          handleChange("objective", lines.length === 1 ? e.target.value : lines);
                        }}
                      />
                    ) : Array.isArray(cv.objective) ? cv.objective.map((item,i) => <p key={i}>{item}</p>) : <p>{cv.objective}</p>}
                  </section>
                )}

                {/* Experience */}
                {hasValue(cv.experience) && Array.isArray(cv.experience) && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Experience</h3>
                    {isEditing(cv.id) ? (
                      <textarea
                        rows={6}
                        className="form-control"
                        value={JSON.stringify(editData.experience || [], null, 2)}
                        onChange={e => {
                          try { handleChange("experience", JSON.parse(e.target.value)); } catch {}
                        }}
                      />
                    ) : (
                      cv.experience.map((job, i) => (
                        <div key={i}>
                          {hasValue(job.role) && <h4 className="h6 text-primary">{job.role}</h4>}
                          {(hasValue(job.company) || hasValue(job.date)) && (
                            <p className="mb-1"><em>{job.company}{job.company && job.date ? " | " : ""}{job.date}</em></p>
                          )}
                          {hasValue(job.details) && Array.isArray(job.details) && (
                            <ul>{job.details.map((d,j) => <li key={j}>{d}</li>)}</ul>
                          )}
                        </div>
                      ))
                    )}
                  </section>
                )}

                {/* Education */}
                {hasValue(cv.education) && Array.isArray(cv.education) && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Education</h3>
                    {isEditing(cv.id) ? (
                      <textarea
                        rows={4}
                        className="form-control"
                        value={JSON.stringify(editData.education || [], null, 2)}
                        onChange={e => {
                          try { handleChange("education", JSON.parse(e.target.value)); } catch {}
                        }}
                      />
                    ) : (
                      cv.education.map((edu,i) => (
                        <p key={i}>
                          {hasValue(edu.date) && (<>{edu.date}<br /></>)}
                          {hasValue(edu.institution) && <strong>{edu.institution}</strong>}<br />
                          {hasValue(edu.note) && <>{edu.note}</>}
                        </p>
                      ))
                    )}
                  </section>
                )}

                {/* Projects */}
                {hasValue(cv.projects) && Array.isArray(cv.projects) && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Projects</h3>
                    {isEditing(cv.id) ? (
                      <textarea
                        rows={4}
                        className="form-control"
                        value={JSON.stringify(editData.projects || [], null, 2)}
                        onChange={e => {
                          try { handleChange("projects", JSON.parse(e.target.value)); } catch {}
                        }}
                      />
                    ) : (
                      cv.projects.map((proj,i) => (
                        <div key={i}>
                          {hasValue(proj.title) && <h4 className="h6 text-primary">{proj.title}</h4>}
                          {hasValue(proj.details) && (Array.isArray(proj.details) ? <ul>{proj.details.map((d,j) => <li key={j}>{d}</li>)}</ul> : <p>{proj.details}</p>)}
                        </div>
                      ))
                    )}
                  </section>
                )}

                {/* Courses */}
                {hasValue(cv.courses) && Array.isArray(cv.courses) && (
                  <div className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Courses</h3>
                    {isEditing(cv.id) ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editData.courses ? editData.courses.join(", ") : ""}
                        onChange={e => handleChange("courses", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                      />
                    ) : (
                      <ul className="list-inline">
                        {cv.courses.map((course,i) => (
                          <li key={i} className="list-inline-item badge text-dark me-1 mb-1">{course}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Languages */}
                {hasValue(cv.languages) && Array.isArray(cv.languages) && (
                  <section className="mb-3">
                    <h3 className="h6 border-bottom pb-1">Languages</h3>
                    {isEditing(cv.id) ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editData.languages ? editData.languages.join(", ") : ""}
                        onChange={e => handleChange("languages", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                      />
                    ) : (
                      <p>{cv.languages.join(", ")}</p>
                    )}
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
