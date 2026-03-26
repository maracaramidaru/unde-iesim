// src/components/FilterPanel.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const zoneOptions = [
  { value: "centru",     label: "Centru Vechi",    emoji: "🏛️" },
  { value: "victoriei",  label: "Piața Victoriei", emoji: "🌿" },
  { value: "unirii",     label: "Piața Unirii",    emoji: "🌊" },
  { value: "floreasca",  label: "Floreasca",       emoji: "🌸" },
  { value: "primaverii", label: "Primăverii",      emoji: "🌳" },
  { value: "cotroceni",  label: "Cotroceni",       emoji: "🎓" },
  { value: "dorobanti",  label: "Dorobanți",       emoji: "✨" },
];

const categoryOptions = [
  { value: "cafea",      label: "Cafenea",    emoji: "☕",  color: "#C8813A" },
  { value: "restaurant", label: "Restaurant", emoji: "🍽️", color: "#2D7D4E" },
  { value: "bar",        label: "Bar",        emoji: "🍸",  color: "#4A6FA5" },
  { value: "club",       label: "Club",       emoji: "🎵",  color: "#7B3FA0" },
];

// ── Vibe options ──────────────────────────────────────────
// Combinate: dacă sunt selectate mai multe categorii, afișăm
// reuniunea opțiunilor relevante (fără duplicate).
const vibeByCategory = {
  cafea: [
    { value: "specialty", label: "Specialty Coffee", emoji: "⚗️" },
    { value: "instagram",  label: "Instagramabil",   emoji: "📸" },
    { value: "chill",      label: "Cozy & Chill",    emoji: "🛋️" },
    { value: "trendy",     label: "Trendy",          emoji: "🔥" },
    { value: "remote",     label: "Remote Work",     emoji: "💻" },
  ],
  restaurant: [
    { value: "date",      label: "Date Night",   emoji: "🕯️" },
    { value: "casual",    label: "Casual",       emoji: "😊" },
    { value: "trendy",    label: "Trendy",       emoji: "🔥" },
    { value: "chill",     label: "Relaxat",      emoji: "🛋️" },
    { value: "instagram", label: "Instagramabil",emoji: "📸" },
  ],
  bar: [
    { value: "chill",     label: "Cozy & Chill",  emoji: "🛋️" },
    { value: "date",      label: "Date Night",    emoji: "🕯️" },
    { value: "trendy",    label: "Trendy",        emoji: "🔥" },
    { value: "instagram", label: "Rooftop / Sky", emoji: "🌆" },
  ],
  club: [
    { value: "party",     label: "Party",         emoji: "🎉" },
    { value: "trendy",    label: "Underground",   emoji: "🖤" },
    { value: "instagram", label: "See & Be Seen", emoji: "💎" },
  ],
  "": [
    { value: "specialty", label: "Specialty Coffee", emoji: "⚗️" },
    { value: "instagram",  label: "Instagramabil",   emoji: "📸" },
    { value: "date",       label: "Date Night",      emoji: "🕯️" },
    { value: "chill",      label: "Cozy & Chill",    emoji: "🛋️" },
    { value: "trendy",     label: "Trendy",          emoji: "🔥" },
    { value: "party",      label: "Party",           emoji: "🎉" },
    { value: "casual",     label: "Casual",          emoji: "😊" },
    { value: "remote",     label: "Remote Work",     emoji: "💻" },
  ],
};

// ── Music options ─────────────────────────────────────────
const musicByCategory = {
  restaurant: [
    { value: "ambient",    label: "Ambient",  emoji: "🌙" },
    { value: "jazz",       label: "Jazz",     emoji: "🎷" },
    { value: "lounge",     label: "Lounge",   emoji: "🥂" },
    { value: "rock",       label: "Rock",     emoji: "🎸" },
    { value: "pop",        label: "Pop",      emoji: "🎤" },
  ],
  bar: [
    { value: "lounge",     label: "Lounge",     emoji: "🥂" },
    { value: "jazz",       label: "Jazz",       emoji: "🎷" },
    { value: "ambient",    label: "Ambient",    emoji: "🌙" },
    { value: "electronic", label: "Electronic", emoji: "🎛️" },
    { value: "pop",        label: "Pop",        emoji: "🎤" },
  ],
  club: [
    { value: "techno",     label: "Techno",     emoji: "⚡" },
    { value: "house",      label: "House",      emoji: "🔊" },
    { value: "electronic", label: "Electronic", emoji: "🎛️" },
    { value: "pop",        label: "Pop",        emoji: "🎤" },
    { value: "hip hop",    label: "Hip Hop",    emoji: "🎤" },
  ],
  "": [
    { value: "ambient",    label: "Ambient",    emoji: "🌙" },
    { value: "lounge",     label: "Lounge",     emoji: "🥂" },
    { value: "jazz",       label: "Jazz",       emoji: "🎷" },
    { value: "pop",        label: "Pop",        emoji: "🎤" },
    { value: "rock",       label: "Rock",       emoji: "🎸" },
    { value: "electronic", label: "Electronic", emoji: "🎛️" },
    { value: "techno",     label: "Techno",     emoji: "⚡" },
    { value: "house",      label: "House",      emoji: "🔊" },
    { value: "soft",       label: "Instrumental",emoji: "🎹" },
  ],
};

// ── Price options ─────────────────────────────────────────
const priceOptions = {
  "":         [{ value: "low", label: "Ieftin",       sub: "€"   },
               { value: "medium", label: "Mediu",      sub: "€€"  },
               { value: "high",   label: "Scump",      sub: "€€€" }],
  cafea:      [{ value: "low", label: "Sub 20 lei",   sub: "€"   },
               { value: "medium", label: "20–35 lei",  sub: "€€"  },
               { value: "high",   label: "Premium",    sub: "€€€" }],
  restaurant: [{ value: "low", label: "Sub 60 lei",   sub: "€"   },
               { value: "medium", label: "60–150 lei", sub: "€€"  },
               { value: "high",   label: "Peste 150",  sub: "€€€" }],
  bar:        [{ value: "low", label: "Shots ieftine",sub: "€"   },
               { value: "medium", label: "Cocktailuri",sub: "€€"  },
               { value: "high",   label: "Premium",    sub: "€€€" }],
  club:       [{ value: "low", label: "Intrare liberă",sub: "€"  },
               { value: "medium", label: "Consumație", sub: "€€"  },
               { value: "high",   label: "VIP / Bottle",sub: "€€€"}],
};

// ── Closing options ───────────────────────────────────────
const closingOptions = {
  "":         [{ value: "22", label: "22:00" }, { value: "23", label: "23:00" },
               { value: "0",  label: "Miezul nopții" }, { value: "3", label: "03:00" },
               { value: "5",  label: "05:00" }],
  cafea:      [{ value: "20", label: "20:00" }, { value: "21", label: "21:00" },
               { value: "22", label: "22:00" }, { value: "23", label: "23:00" }],
  restaurant: [{ value: "22", label: "22:00" }, { value: "23", label: "23:00" },
               { value: "0",  label: "Miezul nopții" }],
  bar:        [{ value: "23", label: "23:00" }, { value: "1",  label: "01:00" },
               { value: "2",  label: "02:00" }, { value: "5",  label: "Non-stop" }],
  club:       [{ value: "3",  label: "03:00" }, { value: "5",  label: "05:00" }],
};

// ── Helpers: merge options for multi-category selection ───
function mergeOptions(optMap, selectedCats) {
  if (selectedCats.length === 0) return optMap[""];
  const seen = new Set();
  const merged = [];
  selectedCats.forEach(cat => {
    (optMap[cat] || []).forEach(opt => {
      if (!seen.has(opt.value)) {
        seen.add(opt.value);
        merged.push(opt);
      }
    });
  });
  return merged.length > 0 ? merged : optMap[""];
}

function getSingleCatOptions(optMap, selectedCats) {
  // For price/closing: use single-cat options only when 1 cat selected
  const cat = selectedCats.length === 1 ? selectedCats[0] : "";
  return optMap[cat] || optMap[""];
}

// ── Components ────────────────────────────────────────────
function EmojiPill({ opt, checked, onClick }) {
  return (
    <button
      type="button"
      className={`fpill${checked ? " fpill-on" : ""}`}
      onClick={onClick}
    >
      {opt.emoji && <span className="fpill-emoji">{opt.emoji}</span>}
      <span className="fpill-label">{opt.label}</span>
      {checked && <span className="fpill-check">✓</span>}
    </button>
  );
}

function PriceGroup({ options, selected, onChange }) {
  return (
    <div className="price-group">
      {options.map(opt => {
        const checked = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`price-pill${checked ? " price-pill-on" : ""}`}
            onClick={() => onChange("price", checked ? "" : opt.value)}
          >
            <span className="price-pill-sub">{opt.sub}</span>
            <span className="price-pill-label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TimeGroup({ options, selected, onChange }) {
  return (
    <div className="time-group">
      {options.map(opt => {
        const checked = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`time-pill${checked ? " time-pill-on" : ""}`}
            onClick={() => onChange("closingHour", checked ? "" : opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function FilterSection({ icon, label, hint, children }) {
  return (
    <div className="fp-section">
      <div className="fp-section-header">
        <span className="fp-section-icon">{icon}</span>
        <span className="fp-section-label">{label}</span>
        {hint && <span className="fp-section-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────
function FilterPanel() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    zone: "", category: [], vibe: [], price: "", music: [], closingHour: "",
  });

  function toggleMulti(name, value) {
    setFilters(prev => {
      const arr = prev[name];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      if (name === "category") {
        // Reset vibe/music/price/closing când se schimbă categoria
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

  function handleReset() {
    setFilters({ zone: "", category: [], vibe: [], price: "", music: [], closingHour: "" });
  }

  const selectedCats = filters.category;

  // Muzica se ascunde dacă TOATE categoriile selectate sunt "cafea"
  // (sau dacă e selectată doar cafenea împreună cu altele nu are sens să arăți muzică de club)
  const allAreCafea = selectedCats.length > 0 && selectedCats.every(c => c === "cafea");
  const hasNonCafea = selectedCats.some(c => c !== "cafea");
  const hideMusic = allAreCafea; // ascunde muzica doar dacă e DOAR cafea

  const currentVibes   = mergeOptions(vibeByCategory, selectedCats);
  const currentMusic   = mergeOptions(musicByCategory, selectedCats);
  const currentPrice   = getSingleCatOptions(priceOptions, selectedCats);
  const currentClosing = getSingleCatOptions(closingOptions, selectedCats);

  // Label-uri contextuale
  const vibeLabel = selectedCats.length === 1
    ? (selectedCats[0] === "cafea" ? "Atmosferă" : selectedCats[0] === "club" ? "Tip club" : "Vibe")
    : "Vibe";
  const musicLabel = selectedCats.length === 1
    ? (selectedCats[0] === "club" ? "Gen muzical" : "Muzică")
    : "Muzică";
  const closingLabel = selectedCats.length === 1
    ? (selectedCats[0] === "club" ? "Durată noapte" : selectedCats[0] === "cafea" ? "Program" : "Deschis până la")
    : "Deschis până la";

  const activeCount = [
    filters.zone, ...filters.category, ...filters.vibe,
    filters.price, ...filters.music, filters.closingHour,
  ].filter(Boolean).length;

  return (
    <div className="fp-panel">

      <div className="fp-header">
        <div className="fp-header-left">
          <div className="fp-eyebrow">✦ CAUTĂ ÎN BUCUREȘTI</div>
          <h3 className="fp-title">Ce cauți în seara asta?</h3>
        </div>
        {activeCount > 0 && (
          <button className="fp-reset" onClick={handleReset}>
            Resetează ({activeCount})
          </button>
        )}
      </div>

      <div className="fp-body">

        <FilterSection icon="📍" label="Zonă">
          <div className="fpill-group">
            {zoneOptions.map(opt => (
              <EmojiPill
                key={opt.value}
                opt={opt}
                checked={filters.zone === opt.value}
                onClick={() => setSingle("zone", filters.zone === opt.value ? "" : opt.value)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection icon="🏠" label="Tip loc" hint="— alege mai multe">
          <div className="cat-group">
            {categoryOptions.map(opt => {
              const checked = filters.category.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`cat-pill${checked ? " cat-pill-on" : ""}`}
                  style={{ "--cat-color": opt.color }}
                  onClick={() => toggleMulti("category", opt.value)}
                >
                  <span className="cat-pill-emoji">{opt.emoji}</span>
                  <span className="cat-pill-label">{opt.label}</span>
                  {checked && <span className="cat-pill-check">✓</span>}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection icon="✨" label={vibeLabel} hint="— alege mai multe">
          <div className="fpill-group">
            {currentVibes.map(opt => (
              <EmojiPill
                key={opt.value}
                opt={opt}
                checked={filters.vibe.includes(opt.value)}
                onClick={() => toggleMulti("vibe", opt.value)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection icon="💰" label="Buget">
          <PriceGroup options={currentPrice} selected={filters.price} onChange={setSingle} />
        </FilterSection>

        {!hideMusic && (
          <FilterSection icon="🎵" label={musicLabel} hint="— alege mai multe">
            <div className="fpill-group">
              {currentMusic.map(opt => (
                <EmojiPill
                  key={opt.value}
                  opt={opt}
                  checked={filters.music.includes(opt.value)}
                  onClick={() => toggleMulti("music", opt.value)}
                />
              ))}
            </div>
          </FilterSection>
        )}

        <FilterSection icon="🕐" label={closingLabel}>
          <TimeGroup options={currentClosing} selected={filters.closingHour} onChange={setSingle} />
        </FilterSection>

      </div>

      <button className="fp-submit" onClick={handleSubmit}>
        <span className="fp-submit-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        {activeCount > 0
          ? `Arată rezultatele · ${activeCount} filtre`
          : "Arată toate locurile"}
        <span className="fp-submit-arrow">→</span>
      </button>
    </div>
  );
}

export default FilterPanel;