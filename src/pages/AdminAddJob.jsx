// src/pages/AdminAddJob.jsx
import { useState } from "react";

const API_BASE = "http://localhost:4000";

function AdminAddJob() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!title.trim() || !category.trim() || !description.trim()) {
      setIsError(true);
      setMessage("Please fill in at least title, category and description.");
      return;
    }

    fetch(`${API_BASE}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        location: location.trim(),
        isRemote,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(() => {
        setMessage("Job created successfully.");
        setTitle("");
        setCategory("");
        setDescription("");
        setLocation("");
        setIsRemote(false);
      })
      .catch((err) => {
        console.error("Error creating job:", err);
        setIsError(true);
        setMessage("Error creating job. Please try again.");
      });
  };

  return (
    <section>
      <h1 className="App-page-title">Admin – Add New Role</h1>
      <p className="App-page-subtitle">
        Create staff or volunteer roles for the Highland Games.
      </p>

      <div className="Card">
        <form onSubmit={handleSubmit}>
          <div className="Form-field">
            <label className="Form-label">Title</label>
            <input
              className="Form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Field Steward, Gate Assistant"
            />
          </div>

          <div className="Form-field">
            <label className="Form-label">Category</label>
            <input
              className="Form-input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Volunteer / Staff / Media"
            />
          </div>

          <div className="Form-field">
            <label className="Form-label">Location</label>
            <input
              className="Form-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Main Arena, West Gate"
            />
          </div>

          <div className="Form-field Form-checkbox-row">
            <input
              type="checkbox"
              id="remote"
              checked={isRemote}
              onChange={(e) => setIsRemote(e.target.checked)}
            />
            <label htmlFor="remote">Remote role (for planning / media)</label>
          </div>

          <div className="Form-field">
            <label className="Form-label">Description</label>
            <textarea
              className="Form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Brief overview of duties, expectations and timings."
            />
          </div>

          <button type="submit" className="Btn Btn-primary">
            Create Role
          </button>

          {message && (
            <p
              className={
                "Message " +
                (isError ? "Message-error" : "Message-success")
              }
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default AdminAddJob;
