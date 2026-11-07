import { useRef, useState } from "react";
import "./Portfolio.css";
import photo from "./photo.jpg";
import PhotoCat from "./PhotoCat";

const STACK = ["python", "typescript", "react", "java", "aws", "gcp", "docker", "kubernetes", "sklearn", "postgresql", "r", "django", "flask"];
const LEARNING = ["go", "angular", "c#", ".net", "rust", "terraform", "fastapi", "pytorch", "claude", "google adk"];

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

interface ExpEntryProps {
  role: string;
  org: string;
  orgHref?: string;
  suffix?: string;
  dates: string;
  bullets: string[];
}

function ExpEntry({ role, org, orgHref, suffix, dates, bullets }: ExpEntryProps) {
  return (
    <article className="exp">
      <div className="exp-row">
        <span className="k">role</span>
        <span className="v strong">{role}</span>
      </div>
      <div className="exp-row">
        <span className="k">org</span>
        <span className="v">
          {orgHref ? (
            <a href={orgHref} target="_blank" rel="noopener noreferrer">{org}</a>
          ) : (
            org
          )}
          {suffix ? ` — ${suffix}` : null}
        </span>
      </div>
      <div className="exp-row">
        <span className="k">dates</span>
        <span className="v dim">{dates}</span>
      </div>
      <ul className="bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

interface ProjectRowProps {
  name: string;
  title: string;
  tech: string[];
  desc: string;
  githubHref?: string;
}

function ProjectRow({ name, title, tech, desc, githubHref }: ProjectRowProps) {
  return (
    <div className="proj">
      <span className="proj-head">
        <span className="proj-name">{name}</span>
        {githubHref ? (
          <a
            className="proj-gh"
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repository for ${title}`}
          >
            <GithubIcon />
          </a>
        ) : null}
      </span>
      <span className="proj-tech">{tech.join(" · ")}</span>
      <p className="proj-desc">{desc}</p>
    </div>
  );
}

interface CertBadgeProps {
  code: string;
  name: string;
  href?: string;
}

function CertBadge({ code, name, href }: CertBadgeProps) {
  return (
    <a className="cert-badge" href={href ?? "#"} target="_blank" rel="noopener noreferrer">
      <span className="cert-code">{code}</span>
      <span className="cert-name">{name}</span>
    </a>
  );
}

const NAYAKI = "nayaki";

interface NameAnimState {
  length: number;
  hovering: boolean;
  forcedActive: boolean;
  timer: number | null;
}

export default function Portfolio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pronounceHint, setPronounceHint] = useState("> 'phil' with a hard 'th' - 'lay' like in 'language'");
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nayakiRef = useRef<HTMLSpanElement>(null);
  const nameCursorRef = useRef<HTMLSpanElement>(null);
  const nameAnimRef = useRef<NameAnimState>({
    length: NAYAKI.length,
    hovering: false,
    forcedActive: false,
    timer: null,
  });

  function renderName() {
    const s = nameAnimRef.current;
    if (nayakiRef.current) nayakiRef.current.textContent = NAYAKI.slice(0, s.length);
    const visible = s.hovering || s.forcedActive || s.timer !== null || s.length < NAYAKI.length;
    nameCursorRef.current?.classList.toggle("is-visible", visible);
  }

  function stepName() {
    const s = nameAnimRef.current;
    const collapse = s.hovering || s.forcedActive;
    if (collapse && s.length > 0) {
      s.length -= 1;
    } else if (!collapse && s.length < NAYAKI.length) {
      s.length += 1;
    } else {
      s.timer = null;
      renderName();
      return;
    }
    renderName();
    s.timer = window.setTimeout(stepName, 133);
  }

  function kickName() {
    const s = nameAnimRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      s.length = s.hovering || s.forcedActive ? 0 : NAYAKI.length;
      renderName();
      return;
    }
    if (s.timer === null) {
      stepName();
    }
  }

  function handleNameHoverStart() {
    nameAnimRef.current.hovering = true;
    kickName();
  }

  function handleNameHoverEnd() {
    nameAnimRef.current.hovering = false;
    kickName();
  }

  function handleNameClick() {
    nameAnimRef.current.forcedActive = !nameAnimRef.current.forcedActive;
    kickName();
  }

  function playSynthBeep() {
    const ctx = audioCtxRef.current ?? new AudioContext();
    audioCtxRef.current = ctx;
    const now = ctx.currentTime;
    ([[523.25, now, 0.14], [659.25, now + 0.14, 0.16]] as const).forEach(([freq, start, dur]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.16, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.02);
    });
  }

  function handlePlayPronunciation() {
    setIsPlaying(true);
    setPronounceHint("sorry I'm still working on getting a proper recording oops");

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(playSynthBeep);
    } else {
      playSynthBeep();
    }

    window.setTimeout(() => {
      setIsPlaying(false);
      setPronounceHint("> 'phil' with a hard 'th' - 'lay' like in 'language'");
    }, 600);
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="tab">
            <span className="tab-icon">{"</>"}</span>
            <span className="tab-name">portfolio.tsx</span>
            <span className="tab-state">
              <span className="dot"></span>
              <span className="close">×</span>
            </span>
          </div>
        </div>
      </header>

      <div className="page">
        <main>
          <section className="hero">
            <div className="hero-grid">
              <div className="hero-text">
                <p className="prompt">
                  thillai@web<span className="sep">:</span>~<span className="sep">$</span> whoami
                </p>
                <h1
                  className="name-wrap"
                  tabIndex={0}
                  onMouseEnter={handleNameHoverStart}
                  onMouseLeave={handleNameHoverEnd}
                  onFocus={handleNameHoverStart}
                  onBlur={handleNameHoverEnd}
                  onClick={handleNameClick}
                >
                  <span className="n-part">Thillai</span>
                  <span className="n-nayaki" ref={nayakiRef}>nayaki</span>
                  <span className="name-cursor" ref={nameCursorRef}></span> <span className="n-part">Sudhakar</span>
                </h1>
                <p className="name-hint">^^ hover to see what to call me for short and click to freeze it :) </p>
                <div className="pronounce">
                  <span className="prompt-inline">$ echo pronunciation</span>
                  <button
                    className="play-btn"
                    type="button"
                    aria-label="Play name pronunciation"
                    aria-pressed={isPlaying}
                    onClick={handlePlayPronunciation}
                  >
                    <span className={`play-icon${isPlaying ? " is-playing" : ""}`}></span>
                  </button>
                  <span className="pronounce-hint">{pronounceHint}</span>
                  <audio ref={audioRef} src="/pronunciation.mp3" preload="none" />
                </div>
                <p className="comment">// Hellooo! I'm a fourth-year CS + Biology student @ Northeastern University</p>
                <p className="comment">
                  // I like to build software that helps people
                </p>
                <p className="comment">
                  // outside of that I like to cook, read fantasy novels &amp; learn new languages (both coding and lingual!)</p>
                <p className="stack-line">
                  <span className="kw">const</span> stack = [
                  {STACK.map((s, i) => (
                    <span key={s}>
                      <span className="tok">{s}</span>
                      {i < STACK.length - 1 ? <span className="punct">, </span> : null}
                    </span>
                  ))}
                  <span className="punct">];</span>
                </p>
                <p className="stack-line">
                  <span className="kw">const</span> learning = [
                  {LEARNING.map((s, i) => (
                    <span key={s}>
                      <span className="tok">{s}</span>
                      {i < LEARNING.length - 1 ? <span className="punct">, </span> : null}
                    </span>
                  ))}
                  <span className="punct">];</span>
                </p>
              </div>

              <PhotoCat src={photo} alt="Thillainayaki Sudhakar" />
            </div>
          </section>

          <section id="experience" className="block">
            <h2 className="label">// experience</h2>

            <div className="exp-columns">
              <div className="exp-col">
                <p className="group-label">professional</p>

                <ExpEntry
                  role="Research Informatics Co-op"
                  org="Tango Therapeutics"
                  orgHref="https://www.tangotx.com/"
                  suffix="Boston, MA"
                  dates="July 2026 – Present"
                  bullets={[
                    "Built a Maximum Common Substructure Tool using RDKit and Material UI React components enabling scientists to quickly compare molecules of interest",
                    "Streamlined Django data migrations and admin panel updates, reducing manual data entry for the research team",
                  ]}
                />
                <ExpEntry
                  role="Full-Stack Software Engineering Co-op"
                  org="LineVision, Inc."
                  orgHref="https://www.linevisioninc.com/"
                  suffix="Charlestown, MA"
                  dates="Jun 2025 – Dec 2025"
                  bullets={[
                    "Reduced dashboard loading times from 18s to 7s via Sequelize query optimization; refactored Python hot paths with Rust/PyO3",
                    "Increased API test coverage ~20% with Jest; shipped bug fixes through automated CI/CD pipelines",
                  ]}
                />
                <ExpEntry
                  role="Teaching Assistant — Fundies & OOD"
                  org="Khoury College of Computer Sciences"
                  suffix="Boston, MA"
                  dates="Sep 2024 – Apr 2025"
                  bullets={[
                    "Conducted office hours and graded assignments for Fundamentals of Computer Science 1 and Object-Oriented Design",
                  ]}
                />
              </div>

              <div className="exp-col">
                <p className="group-label">extracurricular</p>

                <ExpEntry
                  role="Software Developer"
                  org="Code4Community"
                  orgHref="https://www.c4cneu.com/"
                  suffix="Northeastern University"
                  dates="Aug 2025 – October 2026"
                  bullets={[
                    "Worked on a team with other student developers and designers to deliver an accounting platform for BRANCH, a health research organization",
                    "https://github.com/Code-4-Community/branch",
                  ]}
                />
                <ExpEntry
                  role="Event & Relations Co-Lead — ViTAL Hacks"
                  org="ViTAL: NU Healthcare Innovation Core"
                  orgHref="https://vitalnortheastern.org/"
                  dates="Oct 2024 – October 2026"
                  bullets={[
                    "Led logistics for annual healthcare hackathon; manage scheduling for participants and mentors",
                  ]}
                />
                <ExpEntry
                  role="Outreach Coordinator"
                  org="South Indian Student Association"
                  orgHref="https://nusisa.wixsite.com/sisa"
                  dates="Jul 2025 – Apr 2026"
                  bullets={[
                    "Designed newsletters in Canva, managed Mailchimp campaigns, and facilitated cross-cultural org collaborations",
                  ]}
                />
              </div>
            </div>
          </section>

          <section id="projects" className="block">
            <h2 className="label">// projects</h2>
            <div className="proj-list">
              <ProjectRow
                name="pubmed-research-assistant/"
                title="PubMed Research Assistant"
                tech={["python", "fastapi", "react", "gemini"]}
                desc="PubMed + preprint search with parallel bioRxiv/medRxiv coverage, semantic relevance ranking, per-paper evidence extraction, and Gemini-synthesized summaries with citation grounding"
                githubHref="https://github.com/tsudhakar87/pubmed-research-assistant"
              />
              <ProjectRow
                name="restaurant-review-sentiment-analyzer/"
                title="Restaurant Review Sentiment Analyzer"
                tech={["python", "aws", "streamlit", "nlp"]}
                desc="full-stack AWS pipeline + Streamlit dashboard for NLP sentiment analysis"
                githubHref="https://github.com/tsudhakar87/restaurant-review-analyzer"
              />
              <ProjectRow
                name="heart-health-ds4400/"
                title="Heart Health — DS4400"
                tech={["python", "scikit-learn", "xgboost"]}
                desc="compared KNN, logistic regression, SVM, random forest, XGBoost & neural nets for heart disease risk prediction"
                githubHref="https://github.com/tsudhakar87/heart-health-ds4400"
              />
              <ProjectRow
                name="microbiome-environment-classifier/"
                title="Microbiome Environment Classifier"
                tech={["python", "databricks", "mlflow"]}
                desc="random forest pipeline classifying microbial samples by environment from 16S rRNA sequencing data"
                githubHref="https://github.com/tsudhakar87/microbiome_environment_classifier"
              />
              <ProjectRow
                name="indexers-data-processing-system/"
                title="Indexers Data Processing System"
                tech={["python", "pandas"]}
                desc="large-scale JSON file analysis with Pandas"
                githubHref="https://github.com/NU-DS4300/practical-01-ctrl-tab-delete"
              />
              <ProjectRow
                name="nu-clear-coop-review-platform/"
                title="NU-CLEAR Co-op Review Platform"
                tech={["flask", "mysql", "docker"]}
                desc="Flask + MySQL review platform with Docker containerization"
                githubHref="https://github.com/loganravin4/NU-CLEAR"
              />
              <ProjectRow
                name="catalyst-course-scheduler/"
                title="Catalyst Course Scheduler"
                tech={["typescript", "react"]}
                desc="intelligent scheduling assistant built at hackathon"
                githubHref="https://github.com/tsudhakar87/catalyst"
              />
              <ProjectRow
                name="cosmic-checklist/"
                title="Cosmic Checklist"
                tech={["react", "typescript"]}
                desc="space-themed productivity app with React + local storage"
              />  
              <ProjectRow
                name="bon-route/"
                title="Bon Route"
                tech={["go", "angular", "postgresql"]}
                desc="// TODO (in progress): full-stack trip planner that builds food-focused itineraries around restaurants you're craving"
              />
              <ProjectRow
                name="triangle-chess/"
                title="Triangle Chess"
                tech={[".NET", "C#"]}
                desc="// TODO (in progress): implementation of triangle chess board game in an effort to learn c#"
              />
            </div>
          </section>

          <section id="certifications" className="block">
            <h2 className="label">// certifications</h2>
            <div className="cert-row">
              <CertBadge code="AWS" name="AWS Certified Cloud Practitioner" href="https://www.credly.com/badges/57a59eeb-5ea9-4a64-9a19-3353d50f49cf/public_url" />
              <CertBadge code="DB-ML" name="Databricks Certified Machine Learning Associate" href="https://www.credential.net/042eb04f-8bf2-44f1-9bf1-51f0e8022729#acc.bCxV8hGq" />
              <CertBadge code="KCNA" name="Kubernetes and Cloud Native Associate" href="https://www.credly.com/badges/b3ee1681-266e-48f9-926f-e74bfbdd2ee1/public_url"/>
              <CertBadge code="AZ-900" name="Microsoft Certified: Azure Fundamentals" href="https://learn.microsoft.com/en-us/users/thillainayakisudhakar-6616/credentials/5bea08bbab747834"/>
            </div>
          </section>

          <section id="contact" className="block">
            <h2 className="label">// contact</h2>
            <div className="term">
              <div className="term-head">$ cat contact.txt</div>
              <div className="term-body">
                <p>
                  I'm looking for new grad roles! <strong>I graduate in May 2027</strong>
                </p>
                <p>If you like what you see on this portfolio and would like to contact me, please reachout via:</p>
                <p className="dim" style={{ marginBottom: "8px" }}>---</p>
                <div className="links">
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
                    >
                      - {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <span className="comment">// EOF</span>
          <span className="dim">© {new Date().getFullYear()} Thillai(nayaki) Sudhakar</span>
        </footer>
      </div>
    </>
  );
}
