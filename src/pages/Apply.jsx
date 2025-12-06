// src/pages/Apply.jsx
import { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000";

function Apply() {
  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    phone: "",
    competition: "Caber Toss",
    isGroup: false,
    groupName: "",
    participantsCount: "",
    notes: ""
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          participantsCount: form.participantsCount
            ? Number(form.participantsCount)
            : undefined
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to submit application");
      }

      setStatus({
        type: "success",
        message: "Application submitted. We will be in touch."
      });
      setForm({
        applicantName: "",
        email: "",
        phone: "",
        competition: "Caber Toss",
        isGroup: false,
        groupName: "",
        participantsCount: "",
        notes: ""
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  return (
    <section>
      <h1 className="App-page-title">Apply to Participate</h1>
      <p className="App-page-subtitle">
        Use this form to apply as an individual or as a team for one of the
        Paisley Highland Games competitions.
      </p>

      <div className="Card">
        <div className="Card-body">
          <form onSubmit={handleSubmit}>
            <div className="Form-field">
              <label className="Form-label">Name</label>
              <input
                className="Form-input"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Form-field">
              <label className="Form-label">Email</label>
              <input
                className="Form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Form-field">
              <label className="Form-label">Phone (optional)</label>
              <input
                className="Form-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="Form-field">
              <label className="Form-label">Competition</label>
              <select
                className="Form-input"
                name="competition"
                value={form.competition}
                onChange={handleChange}
                required
              >
                <option value="Caber Toss">Caber Toss</option>
                <option value="Tug of War">Tug of War</option>
                <option value="Highland Dance">Highland Dance</option>
                <option value="Pipe Band Display">Pipe Band Display</option>
              </select>
            </div>

            <div className="Form-field Form-checkbox-row">
              <input
                type="checkbox"
                id="isGroup"
                name="isGroup"
                checked={form.isGroup}
                onChange={handleChange}
              />
              <label htmlFor="isGroup">This is a group / team application</label>
            </div>

            {form.isGroup && (
              <>
                <div className="Form-field">
                  <label className="Form-label">Team / Group Name</label>
                  <input
                    className="Form-input"
                    name="groupName"
                    value={form.groupName}
                    onChange={handleChange}
                  />
                </div>

                <div className="Form-field">
                  <label className="Form-label">Number of participants</label>
                  <input
                    className="Form-input"
                    type="number"
                    min="1"
                    name="participantsCount"
                    value={form.participantsCount}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="Form-field">
              <label className="Form-label">Notes (optional)</label>
              <textarea
                className="Form-textarea"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="Btn Btn-primary">
              Submit Application
            </button>

            {status.message && (
              <p
                className={
                  "Message " +
                  (status.type === "success"
                    ? "Message-success"
                    : "Message-error")
                }
                style={{ marginTop: "0.75rem" }}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Apply;
