// src/pages/Jobs.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
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
    loadJobs();
  }, []);

  const categories = [
    "all",
    ...Array.from(new Set(jobs.map((j) => j.category))).sort()
  ];

  const filtered = jobs.filter((job) => {
    const matchCategory =
      categoryFilter === "all" || job.category === categoryFilter;
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      job.title.toLowerCase().includes(s) ||
      job.description.toLowerCase().includes(s) ||
      job.location.toLowerCase().includes(s);
    return matchCategory && matchSearch;
  });

  return (
    <section>
      <h1 className="App-page-title">Event Roles</h1>
      <p className="App-page-subtitle">
        Roles needed to keep the Paisley Highland Games running smoothly.
      </p>

      {error && <p className="Message Message-error">{error}</p>}

      <div className="Card" style={{ marginBottom: "1rem" }}>
        <div className="Card-body">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "0.75rem"
            }}
          >
            <div style={{ flex: "1 1 200px" }}>
              <label className="Form-label">Search</label>
              <input
                className="Form-input"
                placeholder="Search by title, description or location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ width: "220px" }}>
              <label className="Form-label">Category</label>
              <select
                className="Form-input"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "All categories" : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Showing {filtered.length} of {jobs.length} roles.
          </p>
        </div>
      </div>

      {filtered.map((job) => (
        <div key={job._id} className="Card" style={{ marginBottom: "0.8rem" }}>
          <div className="Card-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.3rem"
              }}
            >
              <h2 className="Card-title">{job.title}</h2>
              <span className="Tag">{job.category}</span>
            </div>
            <p className="Card-meta">
              Location: {job.location}{" "}
              {job.isRemote && <span>• Remote-friendly</span>}
            </p>
            <p>
              {job.description.length > 140
                ? job.description.slice(0, 140) + "..."
                : job.description}
            </p>
            <div style={{ marginTop: "0.5rem" }}>
              <Link className="Btn Btn-ghost" to={`/jobs/${job._id}`}>
                View details
              </Link>
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && !error && (
        <p>No roles found. Try adjusting your search or filters.</p>
      )}
    </section>
  );
}

export default Jobs;
