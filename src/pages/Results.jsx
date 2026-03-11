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

  const filtered = places.filter(p => {
    if (filters.zone && p.zone !== filters.zone) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.vibe && p.vibe !== filters.vibe) return false;
    if (filters.price && p.price !== filters.price) return false;
    if (filters.music && p.music !== filters.music) return false;
    if (filters.closingHour && p.closingHour < parseInt(filters.closingHour)) return false;
    return true;
  });

  const activeFilters = Object.entries(filters || {}).filter(([, v]) => v !== "" && v !== null);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8" }}>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {Array(6).fill("✦ BUCUREȘTI TONIGHT ✦ DESCOPERĂ LOCURI ✦ FĂRĂ REVIEW-URI PE TIKTOK ✦ GĂSEȘTE-ȚI LOCUL").join("   ")}
        </div>
      </div>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>#UNDE<span>IEȘIM</span></div>
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
            {filters?.zone && (
              <div className="results-zone-badge">📍 {zoneLabels[filters.zone] || filters.zone}</div>
            )}
          </div>

          {activeFilters.length > 0 && (
            <div className="results-active-filters">
              <div className="filter-section-eyebrow" style={{ marginBottom: "12px" }}>FILTRE ACTIVE</div>
              <div>
                {activeFilters.map(([key, val]) => (
                  <span key={key} className="results-filter-tag">
                    {key === "zone" ? "📍" : key === "category" ? "🏠" : key === "vibe" ? "✨" : key === "price" ? "💰" : key === "music" ? "🎵" : "🕐"} {val}
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
              Încearcă să schimbi sau să scoți câteva filtre.
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