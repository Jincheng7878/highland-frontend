// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <div className="Hero">
        <div className="Hero-overlay" />
        <div className="Hero-content">
          <div className="Hero-tagline">Paisley Highland Games</div>
          <h1 className="Hero-title">Welcome to the Games</h1>
          <p className="Hero-subtitle">
            A fictional Highland Games event. This prototype shows how roles and
            competition applications could be managed online.
          </p>
          <div className="Hero-buttons">
            {/* ✅ 用 Link 代替 a */}
            <Link to="/jobs" className="Btn Btn-primary">
              View Event Roles
            </Link>
            <Link to="/apply" className="Btn Btn-ghost">
              Apply to Compete
            </Link>
          </div>
        </div>
      </div>

      <h2 className="App-page-title">What this site does</h2>
      <p className="App-page-subtitle">
        A small full-stack demo that your fictional software house could show to
        potential clients.
      </p>

      <div className="Card">
        <div className="Card-body">
          <p>
            The idea is to have a generic job and competition platform. For the
            Paisley Highland Games, it manages roles needed to run the event and
            allows individuals or teams to apply to take part in competitions.
            The same pattern could be reused for other Highland Games or
            sporting events by changing the data and branding.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
