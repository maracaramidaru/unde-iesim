// src/pages/Home.jsx
import FilterPanel from "../components/FilterPanel";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Home() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  return (
    <div>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {Array(6).fill("✦ BUCUREȘTI TONIGHT ✦ TE-AI SĂTURAT SĂ CAUȚI PE TIKTOK? ✦ GĂSEȘTE LOCUL PERFECT ✦ VIBES, MUZICĂ, CAFEA").join("   ")}
        </div>
      </div>

      <nav className="nav">
        <div className="nav-logo">#UNDE<span>IEȘIM</span></div>
        <div className="nav-links">
          {["Contact"].map(item => (
            <Link key={item} to="/contact" className="nav-link">{item}</Link>

          ))}
        </div>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <div className="hero-circle-top" />
          <div className="hero-circle-bottom" />
          <div>
            <div className="hero-eyebrow">✦ BUCUREȘTI </div>
            <h1 ref={titleRef} className="hero-title">
              GĂSEȘTE<br />
              <span className="hero-title-accent">LOCUL</span><br />
              PERFECT
            </h1>
            <p className="hero-desc">
              Te-ai săturat să pierzi ore pe TikTok căutând unde să ieși?
              Filtrează după zonă, vibe și muzică — în 10 secunde.
            </p>
          </div>
          <div className="hero-stats">
            {[["200+", "Locuri"], ["50+", "Cluburi"], ["4.8★", "Rating mediu"]].map(([num, label]) => (
              <div key={label}>
                <div className="hero-stat-num">{num}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-grid-bg" />
          <div className="hero-right-content">
            <div className="hero-emoji">🍸</div>
            <div className="hero-right-label">BUCUREȘTI NIGHTLIFE</div>
          </div>
          <div className="hero-badge">NEW SPOTS</div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-inner">
          <div>
            <div className="filter-section-eyebrow">✦ FILTREAZĂ</div>
            <h2 className="filter-section-title">
              SEARA<br /><span>TA,</span><br />ALEGERILE<br />TALE
            </h2>
            <p className="filter-section-desc">
              Spune-ne ce cauți și noi găsim locurile perfecte pentru tine în București.
            </p>
          </div>
          <FilterPanel />
        </div>
      </div>

      <div className="steps-section">
        <div className="steps-eyebrow">✦ CUM FUNCȚIONEAZĂ</div>
        <div className="steps-grid">
          {[
            { step: "01", title: "Alege filtrele", desc: "Selectează zona, tipul de loc, vibe-ul și prețul dorit.", featured: false },
            { step: "02", title: "Explorează", desc: "Browsează prin rezultatele personalizate pentru tine.", featured: true },
            { step: "03", title: "Ieși în oraș", desc: "Apasă pe card și primești indicații direct în Google Maps.", featured: false },
          ].map(({ step, title, desc, featured }) => (
            <div key={step} className={`step${featured ? " is-featured" : ""}`}>
              <div className="step-num">{step}</div>
              <div className="step-title">{title}</div>
              <div className="step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-text-section">
        <div className="footer-big-text">BUCUREȘTI</div>
      </div>
    </div>
  );
}

export default Home;