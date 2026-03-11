// src/components/FilterPanel.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const zoneOptions = [
  { value: "", label: "Orice zonă" },
  { value: "centru", label: "Centru Vechi" },
  { value: "victoriei", label: "Piața Victoriei" },
  { value: "unirii", label: "Piața Unirii" },
  { value: "floreasca", label: "Floreasca" },
  { value: "primaverii", label: "Primăverii" },
  { value: "cotroceni", label: "Cotroceni" },
  { value: "dorobanti", label: "Dorobanți" },
];

const categoryOptions = [
  { value: "", label: "Orice" },
  { value: "cafea", label: "Cafenea" },
  { value: "restaurant", label: "Restaurant" },
  { value: "bar", label: "Bar" },
  { value: "club", label: "Club" },
];

// Vibe options per category
const vibeOptions = {
  "": [
    { value: "", label: "Orice" },
    { value: "specialty", label: "Specialty Coffee" },
    { value: "instagram", label: "Instagramabil" },
    { value: "date", label: "Perfect pentru date" },
    { value: "chill", label: "Cozy / Relaxat" },
    { value: "trendy", label: "Trendy" },
    { value: "party", label: "Party" },
    { value: "casual", label: "Casual" },
  ],
  cafea: [
    { value: "", label: "Orice" },
    { value: "specialty", label: "Specialty Coffee" },
    { value: "instagram", label: "Instagramabil" },
    { value: "chill", label: "Cozy / Relaxat" },
    { value: "trendy", label: "Trendy" },
    { value: "remote", label: "Remote work friendly" },
  ],
  restaurant: [
    { value: "", label: "Orice" },
    { value: "date", label: "Perfect pentru date" },
    { value: "casual", label: "Casual" },
    { value: "trendy", label: "Trendy" },
    { value: "chill", label: "Relaxat" },
    { value: "instagram", label: "Instagramabil" },
  ],
  bar: [
    { value: "", label: "Orice" },
    { value: "chill", label: "Cozy / Relaxat" },
    { value: "date", label: "Perfect pentru date" },
    { value: "trendy", label: "Trendy" },
    { value: "instagram", label: "Rooftop / Instagramabil" },
  ],
  club: [
    { value: "", label: "Orice" },
    { value: "party", label: "Party" },
    { value: "trendy", label: "Trendy / Underground" },
    { value: "instagram", label: "See & be seen" },
  ],
};

// Music options per category
const musicOptions = {
  "": [
    { value: "", label: "Orice" },
    { value: "ambient", label: "Ambient" },
    { value: "lounge", label: "Lounge" },
    { value: "jazz", label: "Jazz" },
    { value: "pop", label: "Pop" },
    { value: "rock", label: "Rock" },
    { value: "electronic", label: "Electronic" },
    { value: "techno", label: "Techno" },
    { value: "house", label: "House" },
  ],
  cafea: [
    { value: "", label: "Orice" },
    { value: "ambient", label: "Ambient" },
    { value: "soft", label: "Soft / Instrumental" },
    { value: "jazz", label: "Jazz" },
    { value: "lounge", label: "Lounge" },
  ],
  restaurant: [
    { value: "", label: "Orice" },
    { value: "ambient", label: "Ambient" },
    { value: "jazz", label: "Jazz" },
    { value: "lounge", label: "Lounge" },
    { value: "rock", label: "Rock" },
    { value: "pop", label: "Pop" },
  ],
  bar: [
    { value: "", label: "Orice" },
    { value: "lounge", label: "Lounge" },
    { value: "jazz", label: "Jazz" },
    { value: "ambient", label: "Ambient / Chill" },
    { value: "electronic", label: "Electronic" },
    { value: "pop", label: "Pop" },
  ],
  club: [
    { value: "", label: "Orice" },
    { value: "techno", label: "Techno" },
    { value: "house", label: "House" },
    { value: "electronic", label: "Electronic" },
    { value: "pop", label: "Pop / Comercial" },
    { value: "hip hop", label: "Hip Hop / R&B" },
  ],
};

// Price options per category
const priceOptions = {
  "": [
    { value: "", label: "Orice" },
    { value: "low", label: "€ Ieftin" },
    { value: "medium", label: "€€ Mediu" },
    { value: "high", label: "€€€ Scump" },
  ],
  cafea: [
    { value: "", label: "Orice" },
    { value: "low", label: "€ Sub 20 lei / cafea" },
    { value: "medium", label: "€€ 20–35 lei / cafea" },
    { value: "high", label: "€€€ Specialty premium" },
  ],
  restaurant: [
    { value: "", label: "Orice" },
    { value: "low", label: "€ Sub 60 lei / persoană" },
    { value: "medium", label: "€€ 60–150 lei / persoană" },
    { value: "high", label: "€€€ Peste 150 lei / persoană" },
  ],
  bar: [
    { value: "", label: "Orice" },
    { value: "low", label: "€ Bere & shots ieftine" },
    { value: "medium", label: "€€ Cocktailuri standard" },
    { value: "high", label: "€€€ Cocktailuri premium" },
  ],
  club: [
    { value: "", label: "Orice" },
    { value: "low", label: "€ Intrare liberă / ieftină" },
    { value: "medium", label: "€€ Intrare + consumație" },
    { value: "high", label: "€€€ Bottle service / VIP" },
  ],
};

// Closing hour options per category
const closingOptions = {
  "": [
    { value: "", label: "Orice oră" },
    { value: "22", label: "Până la 22:00" },
    { value: "23", label: "Până la 23:00" },
    { value: "0", label: "Până la 00:00" },
    { value: "3", label: "Până la 03:00" },
    { value: "5", label: "Până la 05:00" },
  ],
  cafea: [
    { value: "", label: "Orice oră" },
    { value: "20", label: "Închide la 20:00" },
    { value: "21", label: "Închide la 21:00" },
    { value: "22", label: "Închide la 22:00" },
    { value: "23", label: "Închide la 23:00" },
  ],
  restaurant: [
    { value: "", label: "Orice oră" },
    { value: "22", label: "Până la 22:00" },
    { value: "23", label: "Până la 23:00" },
    { value: "0", label: "Până la miezul nopții" },
  ],
  bar: [
    { value: "", label: "Orice oră" },
    { value: "23", label: "Până la 23:00" },
    { value: "1", label: "Până la 01:00" },
    { value: "2", label: "Până la 02:00" },
    { value: "5", label: "Non-stop (5:00)" },
  ],
  club: [
    { value: "", label: "Orice oră" },
    { value: "3", label: "Până la 03:00" },
    { value: "5", label: "Până la 05:00" },
    { value: "99", label: "Non-stop" },
  ],
};

function FilterPanel() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    zone: "", category: "", vibe: "", price: "", music: "", closingHour: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    // Reset dependent filters when category changes
    if (name === "category") {
      setFilters({ ...filters, category: value, vibe: "", music: "", price: "", closingHour: "" });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  }

  function handleSubmit() {
    navigate("/results", { state: filters });
  }

  const cat = filters.category;
  const currentVibes = vibeOptions[cat] || vibeOptions[""];
  const currentMusic = musicOptions[cat] || musicOptions[""];
  const currentPrice = priceOptions[cat] || priceOptions[""];
  const currentClosing = closingOptions[cat] || closingOptions[""];

  return (
    <div className="filter-panel">
      <div className="filter-panel-corner-tl" />
      <div className="filter-panel-corner-br" />
      <div className="filter-panel-eyebrow">✦ FILTRE DE CĂUTARE</div>
      <h3 className="filter-panel-title">Personalizează căutarea</h3>
      <div className="filter-panel-divider" />

      <div className="filter-panel-grid">

        {/* Zonă */}
        <div className="filter-field">
          <label htmlFor="zone">Zonă</label>
          <select id="zone" name="zone" onChange={handleChange} value={filters.zone}>
            {zoneOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Categorie */}
        <div className="filter-field">
          <label htmlFor="category">Tip loc</label>
          <select id="category" name="category" onChange={handleChange} value={filters.category}>
            {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Vibe — context aware */}
        <div className="filter-field">
          <label htmlFor="vibe">
            {cat === "cafea" ? "Atmosferă" : cat === "club" ? "Tip club" : cat === "bar" ? "Tip bar" : "Vibe"}
          </label>
          <select id="vibe" name="vibe" onChange={handleChange} value={filters.vibe}>
            {currentVibes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Preț — context aware */}
        <div className="filter-field">
          <label htmlFor="price">Preț</label>
          <select id="price" name="price" onChange={handleChange} value={filters.price}>
            {currentPrice.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Muzică — ascuns pentru cafea remote work sau nu are sens */}
        {cat !== "cafea" || filters.vibe !== "remote" ? (
          <div className="filter-field">
            <label htmlFor="music">
              {cat === "club" ? "Gen muzical" : cat === "cafea" ? "Muzică de fundal" : "Muzică"}
            </label>
            <select id="music" name="music" onChange={handleChange} value={filters.music}>
              {currentMusic.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        ) : (
          <div className="filter-field">
            <label>Muzică de fundal</label>
            <select disabled style={{ opacity: 0.4, cursor: "not-allowed" }}>
              <option>Ambient / liniștit</option>
            </select>
          </div>
        )}

        {/* Program */}
        <div className="filter-field">
          <label htmlFor="closingHour">
            {cat === "club" ? "Durată noapte" : cat === "cafea" ? "Program" : "Închidere"}
          </label>
          <select id="closingHour" name="closingHour" onChange={handleChange} value={filters.closingHour}>
            {currentClosing.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

      </div>

      <button className="filter-submit-btn" onClick={handleSubmit}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        CAUTĂ LOCURI ✦
      </button>
    </div>
  );
}

export default FilterPanel;