// src/pages/Home.jsx
import FilterPanel from "../components/FilterPanel";
import PlaceCard from "../components/PlaceCard";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import places from "../data/places";

// ── Top locuri — rating >= 4.8, minim 2 recenzii (filtrăm primele 6)
const topPlaces = [...places]
  .filter(p => p.rating >= 4.8)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

// ── Recent deschise — openYear >= 2023, sortate desc
const recentPlaces = [...places]
  .filter(p => p.openYear && p.openYear >= 2023)
  .sort((a, b) => b.openYear - a.openYear)
  .slice(0, 6);

function Home() {
  const titleRef = useRef(null);
  const navigate = useNavigate();

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
      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {Array(6).fill("✦ BUCUREȘTI TONIGHT ✦ TE-AI SĂTURAT SĂ CAUȚI PE TIKTOK? ✦ GĂSEȘTE LOCUL PERFECT ✦ VIBES, MUZICĂ, CAFEA").join("   ")}
        </div>
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">#UNDE<span>IEȘIM</span></div>
        <div className="nav-links">
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-circle-top" />
          <div className="hero-circle-bottom" />
          <div>
            <div className="hero-eyebrow">✦ BUCUREȘTI</div>
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
            {[["180+", "Locuri"], ["19", "Cluburi"], ["4.8★", "Rating mediu"]].map(([num, label]) => (
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

      {/* Filter section */}
      <div className="filter-section" id="filtre">
        <div className="filter-section-inner">
          <div>
            <div className="filter-section-eyebrow">✦ FILTREAZĂ</div>
            <h2 className="filter-section-title">
              <br /><span>TRY</span><br />NEW<br />PLACES
            </h2>
            <p className="filter-section-desc">
              Spune-ne ce cauți și noi găsim locurile perfecte pentru tine în București.
            </p>
          </div>
          <FilterPanel />
        </div>
      </div>

      {/* ── TOP LOCURI ── */}
      {topPlaces.length > 0 && (
        <div className="home-section">
          <div className="home-section-inner">
            <div className="home-section-header">
              <div>
                <div className="filter-section-eyebrow">✦ CELE MAI APRECIATE</div>
                <h2 className="home-section-title">
                  Top <span>Locuri</span>
                </h2>
                <p className="home-section-desc">
                  Localurile cu cele mai mari ratinguri din București, testate și lăudate.
                </p>
              </div>
              <button
                className="home-section-cta"
                onClick={() => navigate("/results", { state: { zone: "", category: [], vibe: [], price: "", music: [], closingHour: "" } })}
              >
                Vezi toate →
              </button>
            </div>
            <div className="home-cards-grid">
              {topPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RECENT DESCHISE ── */}
      {recentPlaces.length > 0 && (
        <div className="home-section home-section-alt">
          <div className="home-section-inner">
            <div className="home-section-header">
              <div>
                <div className="filter-section-eyebrow" style={{ color: "#D4A843" }}>✦ NOU ÎN ORAȘ</div>
                <h2 className="home-section-title">
                  Recent <span>Deschise</span>
                </h2>
                <p className="home-section-desc" style={{ color: "rgba(245,240,232,0.65)" }}>
                  Locurile care au deschis în 2023–2025 și fac deja valuri.
                </p>
              </div>
              <button
                className="home-section-cta home-section-cta-light"
                onClick={() => navigate("/results", { state: { zone: "", category: [], vibe: [], price: "", music: [], closingHour: "" } })}
              >
                Explorează →
              </button>
            </div>
            <div className="home-cards-grid">
              {recentPlaces.map(place => (
                <div key={place.id} className="home-card-wrap">
                  {/* Badge "NOU" */}
                  <div className="home-new-badge">
                    {place.openYear === 2025 ? "🔥 2025" : place.openYear === 2024 ? "✨ 2024" : "⭐ 2023"}
                  </div>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
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