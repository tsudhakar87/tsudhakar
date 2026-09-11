import { useEffect, useRef, useState } from "react";

const ACCENT = "#d6497a";

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(14px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 36,
        height: 3,
        background: ACCENT,
        borderRadius: 4,
        margin: "44px 0",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h6
      style={{
        color: ACCENT,
        margin: "0 0 11px 0",
        fontSize: 13,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {children}
    </h6>
  );
}

interface ExpCardProps {
  role: string;
  org: string;
  orgHref?: string;
  location: string;
  dates: string;
  bullets: string[];
}

function ExpCard({ role, org, orgHref, dates, bullets }: ExpCardProps) {
  return (
    <div
      className="exp-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5.6,
        padding: 11.2,
        borderRadius: 8,
        background: "var(--color-surface)",
        marginBottom: 8,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 11.2,
        }}
      >
        <span
          style={{
            fontWeight: 500,
            fontSize: 17,
            fontFamily: "Inter, system-ui, sans-serif",
            lineHeight: 1.2,
            color: "var(--color-text)",
          }}
        >
          {role}
        </span>
        <span
          style={{
            whiteSpace: "nowrap",
            fontSize: 11,
            color: "color-mix(in srgb, var(--color-text) 50%, transparent)",
          }}
        >
          {dates}
        </span>
      </div>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: ACCENT,
        }}
      >
        {orgHref ? (
          <a
            href={orgHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {org}
          </a>
        ) : (
          org
        )}
      </span>
      <ul
        style={{
          margin: "4px 0 0 0",
          padding: "0 0 0 16px",
          fontSize: 13,
          opacity: 0.8,
          lineHeight: 1.6,
          color: "var(--color-text)",
        }}
      >
        {bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 4 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ProjectRowProps {
  name: string;
  desc: string;
  href?: string;
  tech: string[];
}

function ProjectRow({ name, desc, href, tech }: ProjectRowProps) {
  return (
    <a
      href={href ?? "#"}
      className="row-link"
      style={{
        display: "flex",
        gap: 11.2,
        textDecoration: "none",
        alignItems: "baseline",
        padding: "5.6px 5.6px",
        borderRadius: 8,
        transition: "background 0.15s ease",
        flexWrap: "wrap",
      }}
    >
      <span style={{ color: ACCENT, whiteSpace: "nowrap", flexShrink: 0, fontWeight: 500 }}>
        {name}
      </span>
      <span
        style={{
          color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
          fontSize: 14,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
      <span
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 4,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        {tech.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 10,
              letterSpacing: "0.04em",
              padding: "2px 7px",
              borderRadius: 6,
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
            }}
          >
            {t}
          </span>
        ))}
      </span>
    </a>
  );
}

function SkillTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "3px 10px",
        borderRadius: 15,
        background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
        color: ACCENT,
        fontWeight: 500,
        border: `1px solid color-mix(in srgb, ${ACCENT} 30%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{`
        :root {
          --color-bg: #fffaf9;
          --color-surface: #fdf1f4;
          --color-text: oklch(0.22 0.012 20);
          --color-accent: ${ACCENT};
          --font-body: "Inter", system-ui, sans-serif;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
        }
        .exp-card:hover {
          box-shadow: 0 0 0 1px color-mix(in srgb, currentColor 10%, transparent),
                      0 6px 18px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }
        .row-link:hover { background: var(--color-surface); }
        a { color: var(--color-accent); }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-bg)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 660,
            padding: "88px 24px 64px",
          }}
        >
          {/* ── About ── */}
          <section style={{ opacity: 1 }}>
            <h1 style={{ fontSize: 34, margin: "0 0 8.4px 0", fontWeight: 600, letterSpacing: "-0.015em" }}>
              Thillainayaki Sudhakar
            </h1>
            <p style={{ maxWidth: 600, margin: "0 0 16px 0", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
              Third-year Computer Science & Biology student at Northeastern University,
              passionate about building technology where{" "}
              <span style={{ color: "var(--color-text)", fontWeight: 500 }}>data science meets real-world impact</span>.
              I like traveling, fantasy novels, and learning new languages.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Java", "Python", "TypeScript", "React", "AWS", "Docker", "Pandas", "TensorFlow", "SQL", "Flask"].map((s) => (
                <SkillTag key={s}>{s}</SkillTag>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── Experience ── */}
          <Section>
            <SectionLabel>Experience</SectionLabel>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 40%, transparent)", margin: "0 0 6px 11px" }}>Professional</p>
              <ExpCard
                role="Full-Stack Software Engineering Co-op"
                org="LineVision, Inc."
                orgHref="https://www.linevisioninc.com/"
                location="Charlestown, MA"
                dates="June 2025 – Present"
                bullets={[
                  "Reduced dashboard loading times from 18s to 7s via Sequelize query optimization; refactored Python hot paths with Rust/PyO3",
                  "Increased API test coverage ~20% with Jest; ships bug fixes through automated CI/CD pipelines",
                ]}
              />
              <ExpCard
                role="Teaching Assistant — Fundies & OOD"
                org="Khoury College of Computer Sciences, Northeastern"
                location="Boston, MA"
                dates="Sept 2024 – Apr 2025"
                bullets={[
                  "Conducted office hours and graded assignments for Fundamentals of CS 1 and Object-Oriented Design",
                ]}
              />
            </div>

            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 40%, transparent)", margin: "0 0 6px 11px" }}>Extracurricular</p>
              <ExpCard
                role="Software Developer"
                org="Code4Community"
                orgHref="https://www.c4cneu.com/"
                location="Northeastern University"
                dates="Sept 2025 – Present"
                bullets={["Building software solutions for local nonprofits on a collaborative team"]}
              />
              <ExpCard
                role="Event & Relations Co-Lead — ViTAL Hacks"
                org="ViTAL: Northeastern Healthcare Innovation Core"
                orgHref="https://vitalnortheastern.org/"
                location="Northeastern University"
                dates="Oct 2024 – Present"
                bullets={[
                  "Lead logistics for annual healthcare hackathon; manage scheduling for participants, judges, and mentors",
                ]}
              />
              <ExpCard
                role="Outreach Coordinator"
                org="South Indian Student Association (SISA)"
                orgHref="https://nusisa.wixsite.com/sisa"
                location="Northeastern University"
                dates="July 2025 – Present"
                bullets={[
                  "Design newsletters in Canva, manage Mailchimp campaigns, and facilitate cross-cultural org collaborations",
                ]}
              />
            </div>
          </Section>

          <Divider />

          {/* ── Projects ── */}
          <Section>
            <SectionLabel>Projects</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ProjectRow
                name="Restaurant Review Sentiment Analyzer"
                desc="— full-stack AWS pipeline + Streamlit dashboard for NLP sentiment analysis"
                tech={["python", "aws", "streamlit", "nlp"]}
              />
              <ProjectRow
                name="Indexers Data Processing System"
                desc="— large-scale JSON file analysis with Pandas"
                tech={["python", "pandas"]}
              />
              <ProjectRow
                name="NU-CLEAR Co-op Review Platform"
                desc="— Flask + MySQL review platform with Docker containerization"
                tech={["flask", "mysql", "docker"]}
              />
              <ProjectRow
                name="Catalyst Course Scheduler"
                desc="— intelligent scheduling assistant built at hackathon"
                tech={["typescript", "react"]}
              />
              <ProjectRow
                name="Cosmic Checklist"
                desc="— space-themed productivity app with React + local storage"
                tech={["react", "typescript"]}
              />
            </div>
          </Section>

          <Divider />

          {/* ── Contact ── */}
          <Section>
            <SectionLabel>Contact</SectionLabel>
            <p style={{ maxWidth: 560, margin: "0 0 11.2px 0", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
              Available for co-ops & internships <strong style={{ color: "var(--color-text)" }}>May – December 2026</strong>.
              Email is the best way to reach me.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 5.6, alignItems: "flex-start" }}>
              {[
                { label: "thillainayaki.sudhakar@gmail.com", href: "mailto:thillainayaki.sudhakar@gmail.com" },
                { label: "sudhakar.th@northeastern.edu", href: "mailto:sudhakar.th@northeastern.edu" },
                { label: "github.com/tsudhakar87", href: "https://github.com/tsudhakar87" },
                { label: "linkedin.com/in/thillai-sudhakar", href: "https://linkedin.com/in/thillai-sudhakar/" },
                { label: "credly.com/users/thillai", href: "https://www.credly.com/users/thillai/badges#credly" },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    color: ACCENT,
                    textDecoration: "none",
                    fontSize: 14,
                    padding: "2px 0",
                    borderBottom: `1px solid transparent`,
                    transition: "border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                >
                  {label}
                </a>
              ))}
            </div>
          </Section>

          {/* ── Footer ── */}
          <footer style={{ paddingTop: 44 }}>
            <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 40%, transparent)" }}>
              © {new Date().getFullYear()} Thillainayaki Sudhakar
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
