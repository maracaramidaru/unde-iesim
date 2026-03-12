// src/components/FilterPanel.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const zoneOptions = [
  { value: "centru", label: "Centru Vechi" },
  { value: "victoriei", label: "Piața Victoriei" },
  { value: "unirii", label: "Piața Unirii" },
  { value: "floreasca", label: "Floreasca" },
  { value: "primaverii", label: "Primăverii" },
  { value: "cotroceni", label: "Cotroceni" },
  { value: "dorobanti", label: "Dorobanți" },
];

const categoryOptions = [
  { value: "cafea", label: "☕ Cafenea" },
  { value: "restaurant", label: "🍽️ Restaurant" },
  { value: "bar", label: "🍸 Bar" },
  { value: "club", label: "🎵 Club" },
];

const vibeOptions = {
  "": [
    { value: "specialty", label: "Specialty Coffee" },
    { value: "instagram", label: "Instagramabil" },
    { value: "date", label: "Perfect pentru date" },
    { value: "chill", label: "Cozy / Relaxat" },
    { value: "trendy", label: "Trendy" },
    { value: "party", label: "Party" },
    { value: "casual", label: "Casual" },
    { value: "remote", label: "Remote friendly" },
  ],
  cafea: [
    { value: "specialty", label: "Specialty Coffee" },
    { value: "instagram", label: "Instagramabil" },
    { value: "chill", label: "Cozy / Relaxat" },
    { value: "trendy", label: "Trendy" },
    { value: "remote", label: "Remote work friendly" },
  ],
  restaurant: [
    { value: "date", label: "Perfect pentru date" },
    { value: "casual", label: "Casual" },
    { value: "trendy", label: "Trendy" },
    { value: "chill", label: "Relaxat" },
    { value: "instagram", label: "Instagramabil" },
  ],
  bar: [
    { value: "chill", label: "Cozy / Relaxat" },
    { value: "date", label: "Perfect pentru date" },
    { value: "trendy", label: "Trendy" },
    { value: "instagram", label: "Rooftop / Instagramabil" },
  ],
  club: [
    { value: "party", label: "Party" },
    { value: "trendy", label: "Trendy / Underground" },
    { value: "instagram", label: "See & be seen" },
  ],
};

const musicOptions = {
  "": [
    { value: "ambient", label: "Ambient" },
    { value: "lounge", label: "Lounge" },
    { value: "jazz", label: "Jazz" },
    { value: "pop", label: "Pop" },
    { value: "rock", label: "Rock" },
    { value: "electronic", label: "Electronic" },
    { value: "techno", label: "Techno" },
    { value: "house", label: "House" },
    { value: "soft", label: "Soft / Instrumental" },
  ],
  cafea: [
    { value: "ambient", label: "Ambient" },
    { value: "soft", label: "Soft / Instrumental" },
    { value: "jazz", label: "Jazz" },
    { value: "lounge", label: "Lounge" },
  ],
  restaurant: [
    { value: "ambient", label: "Ambient" },
    { value: "jazz", label: "Jazz" },
    { value: "lounge", label: "Lounge" },
    { value: "rock", label: "Rock" },
    { value: "pop", label: "Pop" },
  ],
  bar: [
    { value: "lounge", label: "Lounge" },
    { value: "jazz", label: "Jazz" },
    { value: "ambient", label: "Ambient / Chill" },
    { value: "electronic", label: "Electronic" },
    { value: "pop", label: "Pop" },
  ],
  club: [
    { value: "techno", label: "Techno" },
    { value: "house", label: "House" },
    { value: "electronic", label: "Electronic" },
    { value: "pop", label: "Pop / Comercial" },
    { value: "hip hop", label: "Hip Hop / R&B" },
  ],
};

const priceOptions = {
  "": [
    { value: "low", label: "€ Ieftin" },
    { value: "medium", label: "€€ Mediu" },
    { value: "high", label: "€€€ Scump" },
  ],
  cafea: [
    { value: "low", label: "€ Sub 20 lei / cafea" },
    { value: "medium", label: "€€ 20–35 lei" },
    { value: "high", label: "€€€ Specialty premium" },
  ],
  restaurant: [
    { value: "low", label: "€ Sub 60 lei / pers." },
    { value: "medium", label: "€€ 60–150 lei / pers." },
    { value: "high", label: "€€€ Peste 150 lei" },
  ],
  bar: [
    { value: "low", label: "€ Bere & shots ieftine" },
    { value: "medium", label: "€€ Cocktailuri standard" },
    { value: "high", label: "€€€ Cocktailuri premium" },
  ],
  club: [
    { value: "low", label: "€ Intrare liberă" },
    { value: "medium", label: "€€ Intrare + consumație" },
    { value: "high", label: "€€€ Bottle service / VIP" },
  ],
};

const closingOptions = {
  "": [
    { value: "22", label: "Până la 22:00" },
    { value: "23", label: "Până la 23:00" },
    { value: "0", label: "Până la 00:00" },
    { value: "3", label: "Până la 03:00" },
    { value: "5", label: "Până la 05:00" },
  ],
  cafea: [
    { value: "20", label: "Până la 20:00" },
    { value: "21", label: "Până la 21:00" },
    { value: "22", label: "Până la 22:00" },
    { value: "23", label: "Până la 23:00" },
  ],
  restaurant: [
    { value: "22", label: "Până la 22:00" },
    { value: "23", label: "Până la 23:00" },
    { value: "0", label: "Până la miezul nopții" },
  ],
  bar: [
    { value: "23", label: "Până la 23:00" },
    { value: "1", label: "Până la 01:00" },
    { value: "2", label: "Până la 02:00" },
    { value: "5", label: "Non-stop (5:00)" },
  ],
  club: [
    { value: "3", label: "Până la 03:00" },
    { value: "5", label: "Până la 05:00" },
  ],
};

// ── Pill checkbox group (multi-select) ──────────────────
function CheckboxGroup({ name, options, selected, onChange }) {
  return (
    <div className="pill-group">
      {options.map(opt => {
        const checked = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            className={`pill${checked ? " pill-active" : ""}`}
            onClick={() => onChange(name, opt.value)}
          >
            {checked && "✓ "}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Pill radio group (single-select, click again to deselect) ──
function RadioGroup({ name, options, selected, onChange }) {
  return (
    <div className="pill-group">
      {options.map(opt => {
        const checked = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`pill${checked ? " pill-active" : ""}`}
            onClick={() => onChange(name, checked ? "" : opt.value)}
          >
            {checked && "✓ "}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Main ────────────────────────────────────────────────
function FilterPanel() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    zone: "",
    category: [],
    vibe: [],
    price: "",
    music: [],
    closingHour: "",
  });

  function toggleMulti(name, value) {
    setFilters(prev => {
      const arr = prev[name];
      const next = arr.includes(value)
        ? arr.filter(v => v !== value)
        : [...arr, value];
      if (name === "category") {
        // Reset dependent filters when category changes
        return { ...prev, category: next, vibe: [], music: [], price: "", closingHour: "" };
      }
      return { ...prev, [name]: next };
    });
  }

  function setSingle(name, value) {
    setFilters(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    navigate("/results", { state: filters });
  }

  // Use category-specific options only when exactly one category is selected
  const cat = filters.category.length === 1 ? filters.category[0] : "";
  const currentVibes   = vibeOptions[cat]    || vibeOptions[""];
  const currentMusic   = musicOptions[cat]   || musicOptions[""];
  const currentPrice   = priceOptions[cat]   || priceOptions[""];
  const currentClosing = closingOptions[cat] || closingOptions[""];
  const hideMusic = cat === "cafea" && filters.vibe.includes("remote");

  const activeCount = [
    filters.zone,
    ...filters.category,
    ...filters.vibe,
    filters.price,
    ...filters.music,
    filters.closingHour,
  ].filter(Boolean).length;

  return (
    <div className="filter-panel">
      <div className="filter-panel-corner-tl" />
      <div className="filter-panel-corner-br" />
      <div className="filter-panel-eyebrow">✦ FILTRE DE CĂUTARE</div>
      <h3 className="filter-panel-title">Personalizează căutarea</h3>
      <div className="filter-panel-divider" />

      <div className="filter-section-block">
        <div className="filter-block-label">Zonă</div>
        <RadioGroup name="zone" options={zoneOptions} selected={filters.zone} onChange={setSingle} />
      </div>

      <div className="filter-section-block">
        <div className="filter-block-label">Tip loc <span className="filter-block-hint">— poți alege mai multe</span></div>
        <CheckboxGroup name="category" options={categoryOptions} selected={filters.category} onChange={toggleMulti} />
      </div>

      <div className="filter-section-block">
        <div className="filter-block-label">
          {cat === "cafea" ? "Atmosferă" : cat === "club" ? "Tip club" : "Vibe"}
          <span className="filter-block-hint"> — poți alege mai multe</span>
        </div>
        <CheckboxGroup name="vibe" options={currentVibes} selected={filters.vibe} onChange={toggleMulti} />
      </div>

      <div className="filter-section-block">
        <div className="filter-block-label">Preț</div>
        <RadioGroup name="price" options={currentPrice} selected={filters.price} onChange={setSingle} />
      </div>

      {!hideMusic && (
        <div className="filter-section-block">
          <div className="filter-block-label">
            {cat === "club" ? "Gen muzical" : cat === "cafea" ? "Muzică de fundal" : "Muzică"}
            <span className="filter-block-hint"> — poți alege mai multe</span>
          </div>
          <CheckboxGroup name="music" options={currentMusic} selected={filters.music} onChange={toggleMulti} />
        </div>
      )}

      <div className="filter-section-block">
        <div className="filter-block-label">
          {cat === "club" ? "Durată noapte" : cat === "cafea" ? "Program" : "Deschis până la"}
        </div>
        <RadioGroup name="closingHour" options={currentClosing} selected={filters.closingHour} onChange={setSingle} />
      </div>

      <button className="filter-submit-btn" onClick={handleSubmit}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        {activeCount > 0 ? `CAUTĂ (${activeCount} filtre activ${activeCount === 1 ? "" : "e"}) ✦` : "CAUTĂ LOCURI ✦"}
      </button>
    </div>
  );
}

export default FilterPanel;