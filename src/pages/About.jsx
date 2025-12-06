// src/pages/About.jsx

function About() {
  return (
    <section>
      <h1 className="App-page-title">About the Paisley Highland Games</h1>
      <p className="App-page-subtitle">
        A celebration of strength, music and Scottish tradition in the heart of Paisley.
      </p>

      <div className="Card">
        <div className="Card-body">
          <p>
            The Paisley Highland Games brings together athletes, performers, visitors and
            local communities for a full day of traditional Scottish events. From caber
            tossing and tug-of-war to piping, dancing and food stalls, the Games are a
            mix of competition, culture and atmosphere.
          </p>

          <p style={{ marginTop: "0.7rem" }}>
            To make all of this happen, the event relies on a wide range of roles: field
            stewards, gate teams, information point staff, media runners, hospitality
            assistants and many more. Some positions are highly visible in the main arena,
            others work quietly behind the scenes to keep everything running smoothly.
          </p>

          <p style={{ marginTop: "0.7rem" }}>
            This site focuses on those roles. It provides a simple way to see what support
            is needed on the day, where different teams are based and what kind of tasks a
            role might involve. Each position has its own description so that staff and
            volunteers know what to expect before they arrive on site.
          </p>

          <p style={{ marginTop: "0.7rem" }}>
            Whether you are interested in helping with crowd management, supporting
            athletes, assisting visitors or working with media and photography, there is
            usually a role that fits your strengths. The aim is to make the experience
            smooth for visitors and safe for competitors, while keeping the relaxed,
            friendly feel that makes Highland Games so popular.
          </p>

          <p style={{ marginTop: "0.7rem", color: "var(--text-muted)" }}>
            If you are planning to join the team, take a look at the roles listed on the
            Jobs page and think about where you would feel most comfortable contributing.
            Every role, big or small, helps the day run well.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
