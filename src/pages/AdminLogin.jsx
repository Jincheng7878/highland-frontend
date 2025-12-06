// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // 非常简单的“认证”：直接把密码存 localStorage
    // 后端会用这个密码当 x-admin-token 验证
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    // 为了简单，前端不额外请求 /login，直接存
    localStorage.setItem("phg_admin_token", password);

    // 简单测试：请求一个受保护接口
    fetch(`${API_BASE}/api/applications`, {
      headers: {
        "x-admin-token": password
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Incorrect admin password.");
        }
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        localStorage.removeItem("phg_admin_token");
        setError(err.message);
      });
  }

  return (
    <section>
      <h1 className="App-page-title">Admin Login</h1>
      <p className="App-page-subtitle">
        This area is for event organisers only. Enter the shared admin password
        to access the dashboard.
      </p>

      <div className="Card">
        <div className="Card-body">
          <form onSubmit={handleSubmit}>
            <div className="Form-field">
              <label className="Form-label">Admin password</label>
              <input
                className="Form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="Btn Btn-primary">
              Log in
            </button>

            {error && (
              <p
                className="Message Message-error"
                style={{ marginTop: "0.75rem" }}
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
