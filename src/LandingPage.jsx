export default function LandingPage() {
  return (
    <div className="page">
      <nav className="nav">
        <span className="brand">Yours, Not Theirs</span>
      </nav>

      <main className="hero">
        <h1 className="headline">
          <span className="headline-accent">Yours,</span>
          <br />
          <span className="headline-base">Not Theirs.</span>
        </h1>
        <p className="subhead">
          Build the prompts that make AI sound like you — not like everyone
          else using the same tools.
        </p>

        <section className="cards">
          <article className="card">
            <h2 className="card-title">Your Writing Voice</h2>
            <p className="card-body">
              Answer a few questions. Get a Signature document that makes any
              AI write the way you actually write.
            </p>
            <a className="btn btn-primary" href="#build">
              Build My Writing Signature
            </a>
          </article>

          <article className="card">
            <h2 className="card-title">Your Visual Signature</h2>
            <p className="card-body">
              Stop AI graphics from defaulting to everyone else's aesthetic.
            </p>
            <button className="btn btn-disabled" type="button" disabled>
              Coming Soon
            </button>
          </article>
        </section>

        <p className="tagline">
          Build your Signature once. Use it wherever you already work.
        </p>
      </main>

      <style>{`
        :root {
          --bg: #F7F7F7;
          --surface: #FFFFFF;
          --border: #E5E5E5;
          --text: #1F2937;
          --text-muted: #4B5563;
          --accent: #7C3AED;
          --accent-hover: #6D28D9;
          --disabled-bg: #E5E7EB;
          --disabled-text: #9CA3AF;
        }

        .page {
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .nav {
          padding: 28px 48px;
        }

        .brand {
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.01em;
          color: var(--text);
        }

        .hero {
          max-width: 960px;
          margin: 0 auto;
          padding: 96px 48px 120px;
          text-align: center;
        }

        .headline {
          font-size: clamp(56px, 9vw, 112px);
          line-height: 1.02;
          letter-spacing: -0.035em;
          font-weight: 800;
          margin: 0 0 40px;
        }

        .headline-accent { color: var(--accent); }
        .headline-base { color: var(--text); }

        .subhead {
          font-size: clamp(18px, 2vw, 22px);
          line-height: 1.5;
          font-weight: 400;
          color: var(--text-muted);
          max-width: 640px;
          margin: 0 auto 80px;
        }

        .cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin: 0 auto 64px;
          max-width: 880px;
          text-align: left;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.015em;
          margin: 0 0 16px;
          color: var(--text);
        }

        .card-body {
          font-size: 16px;
          line-height: 1.55;
          font-weight: 400;
          color: var(--text-muted);
          margin: 0 0 32px;
          flex-grow: 1;
        }

        .btn {
          display: inline-block;
          align-self: flex-start;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.005em;
          padding: 14px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.15s ease;
        }

        .btn-primary {
          background: var(--accent);
          color: #fff;
        }
        .btn-primary:hover { background: var(--accent-hover); }

        .btn-disabled {
          background: var(--disabled-bg);
          color: var(--disabled-text);
          cursor: not-allowed;
        }

        .tagline {
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 720px) {
          .nav { padding: 20px 24px; }
          .hero { padding: 48px 24px 72px; }
          .headline { margin-bottom: 28px; }
          .subhead { margin-bottom: 48px; }
          .cards {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 40px;
          }
          .card { padding: 28px; }
        }
      `}</style>
    </div>
  );
}
