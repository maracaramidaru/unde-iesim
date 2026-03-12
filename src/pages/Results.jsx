// src/pages/Results.jsx
import { useLocation, useNavigate } from "react-router-dom";
import places from "../data/places";
import PlaceCard from "../components/PlaceCard";

const zoneLabels = {
  centru: "Centru Vechi", victoriei: "Piața Victoriei",
  unirii: "Piața Unirii", cotroceni: "Cotroceni",
  primaverii: "Primăverii", floreasca: "Floreasca",
  dorobanti: "Dorobanți", herastrau: "Herăstrău",
};

function Results() {
  const { state: filters } = useLocation();
  const navigate = useNavigate();

  // Guard: if navigated directly without filters
  const f = filters || {};

  const filtered = places.filter(p => {
    // Zone — single string
    if (f.zone && p.zone !== f.zone) return false;

    // Category — array filter vs array/string on place
    if (f.category && f.category.length > 0) {
      const placeCategories = Array.isArray(p.category) ? p.category : [p.category];
      // Place must match AT LEAST ONE of the selected categories
      const hasMatch = f.category.some(c => placeCategories.includes(c));
      if (!hasMatch) return false;
    }

    // Vibe — array filter vs array/string on place
    if (f.vibe && f.vibe.length > 0) {
      const placeVibes = Array.isArray(p.vibe) ? p.vibe : [p.vibe];
      // Place must match AT LEAST ONE selected vibe
      const hasMatch = f.vibe.some(v => placeVibes.includes(v));
      if (!hasMatch) return false;
    }

    // Price — single string
    if (f.price && p.price !== f.price) return false;

    // Music — array filter vs string on place
    if (f.music && f.music.length > 0) {
      const placeMusic = Array.isArray(p.music) ? p.music : [p.music];
      const hasMatch = f.music.some(m => placeMusic.includes(m));
      if (!hasMatch) return false;
    }

    // Closing hour — place must close AT OR AFTER the selected hour
    if (f.closingHour && f.closingHour !== "") {
      const needed = parseInt(f.closingHour, 10);
      const closes = parseInt(p.closingHour, 10);
      // Treat 0 as midnight = 24 for comparison, 5 as 5am is "latest"
      const normalise = h => h === 0 ? 24 : h;
      if (normalise(closes) < normalise(needed)) return false;
    }

    return true;
  });

  // Build readable filter tags for display
  const filterTags = [];
  if (f.zone) filterTags.push({ icon: "📍", label: zoneLabels[f.zone] || f.zone });
  (f.category || []).forEach(v => filterTags.push({ icon: "🏠", label: v }));
  (f.vibe || []).forEach(v => filterTags.push({ icon: "✨", label: v }));
  if (f.price) filterTags.push({ icon: "💰", label: f.price });
  (f.music || []).forEach(v => filterTags.push({ icon: "🎵", label: v }));
  if (f.closingHour) filterTags.push({ icon: "🕐", label: `până la ${f.closingHour}:00` });

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8" }}>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {Array(6).fill("✦ BUCUREȘTI TONIGHT ✦ DESCOPERĂ LOCURI ✦ FĂRĂ REVIEW-URI PE TIKTOK ✦ GĂSEȘTE-ȚI LOCUL").join("   ")}
        </div>
      </div>

      <nav className="nav">
        <div className="nav-logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          #UNDE<span>IEȘIM</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="filter-submit-btn"
          style={{ width: "auto", marginTop: 0, padding: "10px 24px", fontSize: "10px" }}
        >
          ← FILTRE NOI
        </button>
      </nav>

      <div className="results-header">
        <div className="results-header-inner">
          <div>
            <div className="filter-section-eyebrow">✦ REZULTATE</div>
            <h1 className="results-title">
              {filtered.length > 0
                ? <>{filtered.length} <span>LOC{filtered.length !== 1 ? "URI" : ""}</span></>
                : <>NIMIC <span>GĂSIT</span></>
              }
            </h1>
            {f.zone && (
              <div className="results-zone-badge">📍 {zoneLabels[f.zone] || f.zone}</div>
            )}
          </div>

          {filterTags.length > 0 && (
            <div className="results-active-filters">
              <div className="filter-section-eyebrow" style={{ marginBottom: "12px" }}>FILTRE ACTIVE</div>
              <div>
                {filterTags.map((tag, i) => (
                  <span key={i} className="results-filter-tag">
                    {tag.icon} {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="results-content">
        {filtered.length === 0 ? (
          <div className="results-empty">
            <div className="results-empty-emoji">🔍</div>
            <h2 className="results-empty-title">Nicio potrivire</h2>
            <p className="results-empty-desc">
              Încearcă să scoți câteva filtre — poate combini categorii care nu se suprapun.
            </p>
            <button
              className="filter-submit-btn"
              style={{ width: "auto", marginTop: "32px" }}
              onClick={() => navigate("/")}
            >
              ← ÎNAPOI LA FILTRE
            </button>
          </div>
        ) : (
          <div className="results-grid">
            {filtered.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;