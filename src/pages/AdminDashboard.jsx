// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000";

function getAdminToken() {
  return localStorage.getItem("phg_admin_token") || "";
}

function AdminDashboard() {
  const [jobForm, setJobForm] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    isRemote: false
  });
  const [jobStatus, setJobStatus] = useState({ type: "", message: "" });

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  async function loadJobs() {
    try {
      const res = await fetch(`${API_BASE}/api/jobs`);
      if (!res.ok) throw new Error("Failed to load jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadApplications() {
    try {
      const res = await fetch(`${API_BASE}/api/applications`, {
        headers: {
          "x-admin-token": getAdminToken()
        }
      });
      if (!res.ok) throw new Error("Failed to load applications");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  function handleJobChange(e) {
    const { name, value, type, checked } = e.target;
    setJobForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleJobSubmit(e) {
    e.preventDefault();
    setJobStatus({ type: "", message: "" });

    try {
      const res = await fetch(`${API_BASE}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getAdminToken()
        },
        body: JSON.stringify(jobForm)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to create job");
      }

      setJobStatus({
        type: "success",
        message: "Role created successfully."
      });
      setJobForm({
        title: "",
        category: "",
        description: "",
        location: "",
        isRemote: false
      });
      loadJobs();
    } catch (err) {
      setJobStatus({ type: "error", message: err.message });
    }
  }

  async function handleDeleteJob(id) {
    if (!window.confirm("Delete this role?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": getAdminToken()
        }
      });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDeleteApplication(id) {
    if (!window.confirm("Delete this application?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": getAdminToken()
        }
      });
      if (!res.ok) throw new Error("Failed to delete application");
      setApplications((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <section>
      <h1 className="App-page-title">Admin Dashboard</h1>
      <p className="App-page-subtitle">
        Maintain event roles and review competition applications. Only staff
        should have access to this area.
      </p>

      {error && (
        <p className="Message Message-error" style={{ marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      {/* 创建岗位 */}
      <div className="Card" style={{ marginBottom: "1.5rem" }}>
        <div className="Card-body">
          <h2 className="Card-title">Create new role</h2>
          <form onSubmit={handleJobSubmit}>
            <div className="Form-field">
              <label className="Form-label">Title</label>
              <input
                className="Form-input"
                name="title"
                value={jobForm.title}
                onChange={handleJobChange}
                required
              />
            </div>
            <div className="Form-field">
              <label className="Form-label">Category</label>
              <input
                className="Form-input"
                name="category"
                value={jobForm.category}
                onChange={handleJobChange}
                placeholder="e.g. Volunteer, Staff, Media"
                required
              />
            </div>
            <div className="Form-field">
              <label className="Form-label">Location</label>
              <input
                className="Form-input"
                name="location"
                value={jobForm.location}
                onChange={handleJobChange}
                placeholder="e.g. Main Arena, West Gate"
                required
              />
            </div>
            <div className="Form-field">
              <label className="Form-label">Description</label>
              <textarea
                className="Form-textarea"
                name="description"
                rows={3}
                value={jobForm.description}
                onChange={handleJobChange}
                required
              />
            </div>
            <div className="Form-field Form-checkbox-row">
              <input
                type="checkbox"
                id="isRemote"
                name="isRemote"
                checked={jobForm.isRemote}
                onChange={handleJobChange}
              />
              <label htmlFor="isRemote">Remote-friendly role</label>
            </div>
            <button type="submit" className="Btn Btn-primary">
              Create Role
            </button>
            {jobStatus.message && (
              <p
                className={
                  "Message " +
                  (jobStatus.type === "success"
                    ? "Message-success"
                    : "Message-error")
                }
                style={{ marginTop: "0.75rem" }}
              >
                {jobStatus.message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* 已有岗位列表 + 删除 */}
      <div className="Card" style={{ marginBottom: "1.5rem" }}>
        <div className="Card-body">
          <h2 className="Card-title">Existing roles</h2>
          {jobs.length === 0 && <p>No roles created yet.</p>}
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                borderTop: "1px solid var(--border-soft)",
                paddingTop: "0.6rem",
                marginTop: "0.6rem"
              }}
            >
              <strong>{job.title}</strong>{" "}
              <span style={{ color: "var(--text-muted)" }}>
                ({job.category} • {job.location})
              </span>
              <p style={{ fontSize: "0.85rem", marginTop: "0.2rem" }}>
                {job.description.length > 120
                  ? job.description.slice(0, 120) + "..."
                  : job.description}
              </p>
              <button
                className="Btn Btn-ghost"
                onClick={() => handleDeleteJob(job._id)}
              >
                Delete role
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 报名列表 + 删除 */}
      <div className="Card">
        <div className="Card-body">
          <h2 className="Card-title">Applications</h2>
          {applications.length === 0 && <p>No applications submitted yet.</p>}
          {applications.map((app) => (
            <div
              key={app._id}
              style={{
                borderTop: "1px solid var(--border-soft)",
                paddingTop: "0.6rem",
                marginTop: "0.6rem"
              }}
            >
              <strong>{app.applicantName}</strong>{" "}
              <span style={{ color: "var(--text-muted)" }}>({app.email})</span>
              <p style={{ marginTop: "0.2rem" }}>
                Competition: <span className="Tag">{app.competition}</span>
              </p>
              {app.isGroup && (
                <p>
                  Group: {app.groupName || "Unnamed team"} —{" "}
                  {app.participantsCount || 1} participants
                </p>
              )}
              {app.notes && (
                <p style={{ marginTop: "0.2rem" }}>Notes: {app.notes}</p>
              )}
              <p
                style={{
                  marginTop: "0.2rem",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)"
                }}
              >
                Submitted at:{" "}
                {app.createdAt
                  ? new Date(app.createdAt).toLocaleString()
                  : ""}
              </p>
              <button
                className="Btn Btn-ghost"
                onClick={() => handleDeleteApplication(app._id)}
              >
                Delete application
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
