// src/pages/JobDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJob() {
      try {
        const res = await fetch(`${API_BASE}/api/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to load job");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadJob();
  }, [id]);

  if (error) {
    return (
      <section>
        <h1 className="App-page-title">Role details</h1>
        <p className="Message Message-error">{error}</p>
        <Link className="Btn Btn-ghost" to="/jobs">
          Back to roles
        </Link>
      </section>
    );
  }

  if (!job) {
    return (
      <section>
        <h1 className="App-page-title">Role details</h1>
        <p>Loading role information...</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="App-page-title">{job.title}</h1>
      <p className="App-page-subtitle">
        Category: {job.category} • Location: {job.location}{" "}
        {job.isRemote && "(remote-friendly)"}
      </p>

      <div className="Card">
        <div className="Card-body">
          <p>{job.description}</p>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Link className="Btn Btn-ghost" to="/jobs">
          Back to all roles
        </Link>
      </div>
    </section>
  );
}

export default JobDetails;
