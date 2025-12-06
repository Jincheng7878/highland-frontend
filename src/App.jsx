// src/App.jsx
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Apply from "./pages/Apply.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <div className="App-shell">
      <header className="App-nav">
        <div className="App-logo">
          <div className="App-logo-circle">PHG</div>
          <div className="App-logo-text">Paisley Highland Games</div>
        </div>
        <nav className="App-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "App-nav-link" + (isActive ? " App-nav-link-active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              "App-nav-link" + (isActive ? " App-nav-link-active" : "")
            }
          >
            Roles
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              "App-nav-link" + (isActive ? " App-nav-link-active" : "")
            }
          >
            Apply
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              "App-nav-link" + (isActive ? " App-nav-link-active" : "")
            }
          >
            About
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              "App-nav-link" + (isActive ? " App-nav-link-active" : "")
            }
          >
            Admin
          </NavLink>
        </nav>
      </header>

      <main className="App-main">
        <div className="App-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
