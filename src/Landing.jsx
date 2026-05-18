import { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// THE SIGNATURE METHOD — Landing / Tool Hub
// Each tool below becomes a card. When a new tool is ready, add it to TOOLS
// with status: "live" and an href (e.g. "#/voice"). Coming-soon tools render
// non-clickable. The catalog of filter chips drives the left sidebar.
// ─────────────────────────────────────────────────────────────────────────────

const INK = "#0f1419";
const MUTED = "#6b7280";
const LINE = "#e5e7eb";
const SOFT = "#f3f4f6";
const ACCENT = "#6B4EE6";
const ACCENT_SOFT = "#f0edff";
const ACCENT_INK = "#2E1F5E";

const TOOLS = [
  {
    id: "voice",
    title: "Your Voice, Not Theirs",
    blurb:
      "Build a Forbidden List and Voice Signature from your own writing. Drag the output into a Claude or ChatGPT project so your AI stops sounding like everyone else's.",
    category: "Voice",
    output: "System Prompt",
    status: "live",
    href: "#/voice",
    accent: "#6B4EE6",
    glyph: "V",
  },
  {
    id: "positioning",
    title: "Positioning From Your Own Words",
    blurb:
      "Pull the language you already use with clients into a one-page positioning brief you can hand to a designer, a writer, or an AI tool.",
    category: "Strategy",
    output: "Brief",
    status: "soon",
    accent: "#E47B5A",
    glyph: "P",
  },
  {
    id: "offer",
    title: "Offer Sharpener",
    blurb:
      "Paste a rambling offer description. Get back a tight, structured offer doc with the claims, proof, and the one thing the buyer needs to believe.",
    category: "Strategy",
    output: "Document",
    status: "soon",
    accent: "#3F8F6E",
    glyph: "O",
  },
  {
    id: "rewrite",
    title: "Sounds-Like-You Rewrite",
    blurb:
      "Paste AI-flavored copy. Get a rewrite in your voice signature, with the AI tells named and stripped. Output is a paste-ready document.",
    category: "Writing",
    output: "Document",
    status: "soon",
    accent: "#5A7CB2",
    glyph: "R",
  },
  {
    id: "context",
    title: "Context Mode Builder",
    blurb:
      "Define when your voice flexes — sales pages, client emails, talks, internal notes — as named modes the AI can switch between on request.",
    category: "Voice",
    output: "System Prompt",
    status: "soon",
    accent: "#A862B0",
    glyph: "C",
  },
  {
    id: "intake",
    title: "Client Intake Distiller",
    blurb:
      "Drop transcripts or notes from a discovery call. Get a structured intake document with the brief, the constraints, and the unspoken assumptions.",
    category: "Process",
    output: "Document",
    status: "soon",
    accent: "#C28A2C",
    glyph: "I",
  },
];

const CATEGORIES = ["Voice", "Writing", "Strategy", "Process"];
const OUTPUTS = ["System Prompt", "Document", "Brief", "Template"];
const STATUSES = [
  { key: "live", label: "Available" },
  { key: "soon", label: "In development" },
];

export default function Landing() {
  const [category, setCategory] = useState(null);
  const [output, setOutput] = useState(null);
  const [status, setStatus] = useState(null);
  const [openSection, setOpenSection] = useState({
    category: true,
    output: true,
    status: true,
  });

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      if (category && t.category !== category) return false;
      if (output && t.output !== output) return false;
      if (status && t.status !== status) return false;
      return true;
    });
  }, [category, output, status]);

  const clearAll = () => {
    setCategory(null);
    setOutput(null);
    setStatus(null);
  };

  const activeCount = [category, output, status].filter(Boolean).length;

  return (
    <div style={{ color: INK, paddingBottom: 80 }}>
      <Header />
      <Hero />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 28,
          marginTop: 28,
        }}
        className="sm-grid"
      >
        <Sidebar
          category={category}
          setCategory={setCategory}
          output={output}
          setOutput={setOutput}
          status={status}
          setStatus={setStatus}
          openSection={openSection}
          setOpenSection={setOpenSection}
          activeCount={activeCount}
          clearAll={clearAll}
        />
        <ToolGrid tools={filtered} />
      </div>
      <Footer />
      <style>{`
        @media (max-width: 860px) {
          .sm-grid { grid-template-columns: 1fr !important; }
          .sm-nav { display: none !important; }
        }
        .sm-card { transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
        .sm-card.live:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(15,20,25,.08); border-color: ${ACCENT}; }
        .sm-chip { transition: background .15s ease, color .15s ease, border-color .15s ease; }
        .sm-link:hover { color: ${ACCENT} !important; }
      `}</style>
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0 20px",
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <a
        href="#/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: INK,
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: ACCENT,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontFamily: "Newsreader, serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: 18,
            letterSpacing: "-.02em",
          }}
        >
          S
        </span>
        <span
          style={{
            fontFamily: "Newsreader, serif",
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: "-.01em",
          }}
        >
          The Signature Method
        </span>
      </a>
      <nav
        className="sm-nav"
        style={{ display: "flex", alignItems: "center", gap: 28 }}
      >
        {["Tools", "Method", "Resources", "About"].map((item) => (
          <a
            key={item}
            href={`#/${item.toLowerCase()}`}
            className="sm-link"
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: INK,
              textDecoration: "none",
            }}
          >
            {item}
          </a>
        ))}
        <a
          href="#/voice"
          style={{
            background: ACCENT,
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: ".02em",
            textDecoration: "none",
            boxShadow: "0 1px 2px rgba(107,78,230,.25)",
          }}
        >
          Start with Voice
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ textAlign: "center", padding: "56px 16px 24px" }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: ACCENT,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        The Signature Method · Tool Hub
      </p>
      <h1
        style={{
          fontFamily: "Newsreader, serif",
          fontWeight: 600,
          fontSize: "clamp(34px, 5vw, 54px)",
          lineHeight: 1.05,
          letterSpacing: "-.02em",
          maxWidth: 820,
          margin: "0 auto 18px",
        }}
      >
        Tools that turn how <em style={{ fontStyle: "italic" }}>you</em> work
        into outputs your AI can use.
      </h1>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.55,
          color: MUTED,
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        Each tool takes a few inputs and gives you back a document — a
        Forbidden List, a positioning brief, a voice signature, a rewrite. Drag
        the file into a Claude or ChatGPT project and your AI stops sounding
        like everyone else's.
      </p>
    </section>
  );
}

function Sidebar({
  category,
  setCategory,
  output,
  setOutput,
  status,
  setStatus,
  openSection,
  setOpenSection,
  activeCount,
  clearAll,
}) {
  return (
    <aside
      style={{
        border: `1px solid ${LINE}`,
        borderRadius: 14,
        background: "#fff",
        padding: 18,
        height: "fit-content",
        position: "sticky",
        top: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: MUTED,
            letterSpacing: ".14em",
            textTransform: "uppercase",
          }}
        >
          Filter by
        </p>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: "none",
              border: "none",
              color: ACCENT,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Clear ({activeCount})
          </button>
        )}
      </div>

      <FilterSection
        label="Category"
        open={openSection.category}
        toggle={() =>
          setOpenSection({ ...openSection, category: !openSection.category })
        }
      >
        {CATEGORIES.map((c) => (
          <FilterPill
            key={c}
            active={category === c}
            onClick={() => setCategory(category === c ? null : c)}
          >
            {c}
          </FilterPill>
        ))}
      </FilterSection>

      <FilterSection
        label="Output"
        open={openSection.output}
        toggle={() =>
          setOpenSection({ ...openSection, output: !openSection.output })
        }
      >
        {OUTPUTS.map((o) => (
          <FilterPill
            key={o}
            active={output === o}
            onClick={() => setOutput(output === o ? null : o)}
          >
            {o}
          </FilterPill>
        ))}
      </FilterSection>

      <FilterSection
        label="Status"
        open={openSection.status}
        toggle={() =>
          setOpenSection({ ...openSection, status: !openSection.status })
        }
        last
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {STATUSES.map((s) => (
            <button
              key={s.key}
              onClick={() => setStatus(status === s.key ? null : s.key)}
              className="sm-chip"
              style={{
                border: `1.5px solid ${status === s.key ? ACCENT : LINE}`,
                background: status === s.key ? ACCENT_SOFT : "#fff",
                color: status === s.key ? ACCENT_INK : INK,
                padding: "8px 6px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}

function FilterSection({ label, open, toggle, children, last }) {
  return (
    <div
      style={{
        borderTop: `1px solid ${LINE}`,
        paddingTop: 14,
        marginTop: 14,
        paddingBottom: last ? 0 : 0,
      }}
    >
      <button
        onClick={toggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          marginBottom: open ? 10 : 0,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: INK,
            letterSpacing: ".02em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: MUTED,
            fontSize: 12,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .15s ease",
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="sm-chip"
      style={{
        border: `1.5px solid ${active ? ACCENT : LINE}`,
        background: active ? ACCENT_SOFT : "#fff",
        color: active ? ACCENT_INK : INK,
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function ToolGrid({ tools }) {
  if (tools.length === 0) {
    return (
      <div
        style={{
          border: `1px dashed ${LINE}`,
          borderRadius: 14,
          padding: "60px 24px",
          textAlign: "center",
          color: MUTED,
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 6 }}>
          Nothing matches those filters yet.
        </p>
        <p style={{ fontSize: 14 }}>More tools are on the way.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 18,
      }}
    >
      {tools.map((t) => (
        <ToolCard key={t.id} tool={t} />
      ))}
    </div>
  );
}

function ToolCard({ tool }) {
  const live = tool.status === "live";
  const inner = (
    <article
      className={`sm-card ${live ? "live" : ""}`}
      style={{
        border: `1px solid ${LINE}`,
        borderRadius: 14,
        background: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        opacity: live ? 1 : 0.92,
      }}
    >
      <div
        style={{
          background: tool.accent,
          height: 132,
          position: "relative",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Newsreader, serif",
            fontStyle: "italic",
            fontWeight: 600,
            color: "#fff",
            fontSize: 72,
            lineHeight: 1,
            letterSpacing: "-.03em",
            opacity: 0.95,
          }}
        >
          {tool.glyph}
        </span>
        <span
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: live ? "#fff" : "rgba(255,255,255,.85)",
            color: live ? tool.accent : "#374151",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "5px 9px",
            borderRadius: 999,
          }}
        >
          {live ? "Available" : "Soon"}
        </span>
      </div>
      <div
        style={{
          padding: "16px 18px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "Newsreader, serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: "-.01em",
            color: INK,
          }}
        >
          {tool.title}
        </h3>
        <p
          style={{
            fontSize: 13.5,
            color: MUTED,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {tool.blurb}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Tag>{tool.category}</Tag>
          <Tag>{tool.output}</Tag>
        </div>
        {live ? (
          <div
            style={{
              marginTop: 4,
              fontSize: 13,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: "-.005em",
            }}
          >
            Open tool →
          </div>
        ) : (
          <div
            style={{
              marginTop: 4,
              fontSize: 12.5,
              fontWeight: 600,
              color: MUTED,
            }}
          >
            In development
          </div>
        )}
      </div>
    </article>
  );

  if (!live) return inner;
  return (
    <a
      href={tool.href}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      {inner}
    </a>
  );
}

function Tag({ children }) {
  return (
    <span
      style={{
        background: SOFT,
        color: "#374151",
        fontSize: 11.5,
        fontWeight: 600,
        padding: "4px 9px",
        borderRadius: 6,
        letterSpacing: ".01em",
      }}
    >
      {children}
    </span>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 56,
        paddingTop: 24,
        borderTop: `1px solid ${LINE}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        color: MUTED,
        fontSize: 12.5,
      }}
    >
      <span>
        <span style={{ fontFamily: "Newsreader, serif", fontStyle: "italic" }}>
          The Signature Method
        </span>{" "}
        — by Not Theirs Studio
      </span>
      <span>Your voice. Not theirs.</span>
    </footer>
  );
}
