// src/components/PlaceCard.jsx
import { useState } from "react";

const priceMap   = { low: "€", medium: "€€", high: "€€€" };
const priceLabel = { low: "Accesibil", medium: "Mediu", high: "Premium" };

const vibeMap = {
  specialty: "Specialty Coffee", instagram: "Instagramabil",
  date: "Date Night", chill: "Cozy & Chill", trendy: "Trendy",
  party: "Party", casual: "Casual", remote: "Remote Friendly", underground: "Underground",
};
const vibeEmoji = {
  specialty: "⚗️", instagram: "📸", date: "🕯️", chill: "🛋️",
  trendy: "🔥", party: "🎉", casual: "😊", remote: "💻", underground: "🖤",
};
const catColor = {
  cafea: "#C8813A", restaurant: "#2D7D4E", bar: "#4A6FA5", club: "#7B3FA0",
};

// Format hour to HH:00 string
function fmtHour(h) {
  if (h == null) return null;
  const n = Number(h);
  if (n === 0)  return "00:00";
  if (n === 24) return "00:00";
  return `${String(n).padStart(2, "0")}:00`;
}

// Build schedule string from openingHour + closingHour
// openingHour defaults per category if not set in data
function buildSchedule(place) {
  const categories = Array.isArray(place.category) ? place.category : [place.category];
  const cat = categories[0];

  // Default opening hours per category
  const defaultOpen = {
    cafea:      8,
    restaurant: 11,
    bar:        16,
    club:       22,
  };

  const opens  = place.openingHour  != null ? place.openingHour  : (defaultOpen[cat] ?? 9);
  const closes = place.closingHour  != null ? place.closingHour  : 23;

  const openStr  = fmtHour(opens);
  const closeStr = fmtHour(closes);

  if (!openStr || !closeStr) return null;
  return `${openStr} – ${closeStr}`;
}

// Is the place currently open?
function isOpenNow(place) {
  const categories = Array.isArray(place.category) ? place.category : [place.category];
  const cat = categories[0];
  const defaultOpen = { cafea: 8, restaurant: 11, bar: 16, club: 22 };

  const opens  = place.openingHour != null ? place.openingHour : (defaultOpen[cat] ?? 9);
  const closes = place.closingHour != null ? place.closingHour : 23;

  const now = new Date();
  const h   = now.getHours();

  // Handle overnight closing (e.g. closes at 2, 3, 5 AM)
  if (closes <= 6) {
    // Open from `opens` until midnight, then midnight until `closes`
    return h >= opens || h < closes;
  }
  return h >= opens && h < closes;
}

function StarRating({ rating }) {
  return (
    <div className="pc-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < Math.round(rating) ? "pc-star on" : "pc-star"}>★</span>
      ))}
      <span className="pc-rating-num">{Number(rating).toFixed(1)}</span>
    </div>
  );
}

function PlaceCard({ place, index = 0 }) {
  const [copied, setCopied] = useState(false);

  const categories  = Array.isArray(place.category) ? place.category : [place.category];
  const vibes       = Array.isArray(place.vibe)     ? place.vibe     : [place.vibe];
  const primaryCat  = categories[0];
  const accentColor = catColor[primaryCat] || "#8B1A1A";

  const schedule  = buildSchedule(place);
  const openNow   = isOpenNow(place);
  const idxStr    = String(place.id || index + 1).padStart(2, "0");
  const mapsUrl   = `https://www.google.com/search?q=${encodeURIComponent(place.name + " București")}&tbm=isch`;

  const handleCall = () => {
    if (!place.phone) return;
    window.location.href = `tel:${place.phone.replace(/\s/g, "")}`;
  };

  const handleCopyPhone = () => {
    if (!place.phone) return;
    navigator.clipboard.writeText(place.phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, "_blank");
  };

  return (
    <div className="pc-card" style={{ "--accent": accentColor }}>

      <div className="pc-stripe" />
      <div className="pc-watermark">{idxStr}</div>

      {/* Top */}
      <div className="pc-top">
        <div className="pc-meta-row">
          <div className="pc-cats">
            {categories.map(c => (
              <span key={c} className="pc-cat-badge" style={{ background: catColor[c] || "#8B1A1A" }}>{c}</span>
            ))}
          </div>
          <div className="pc-price-wrap">
            <span className="pc-price-sym">{priceMap[place.price] || place.price}</span>
            <span className="pc-price-label">{priceLabel[place.price] || ""}</span>
          </div>
        </div>

        <h3 className="pc-name">{place.name}</h3>

        <div className="pc-sub-row">
          {place.rating != null && <StarRating rating={place.rating} />}
          <span className="pc-zone">📍 {place.zone}</span>
        </div>
      </div>

      <div className="pc-rule" />

      {/* Mid */}
      <div className="pc-mid">
        <div className="pc-address">{place.address}</div>

        <div className="pc-vibes">
          {vibes.map(v => (
            <span key={v} className="pc-vibe-pill">
              <span className="pc-vibe-emoji">{vibeEmoji[v] || "✦"}</span>
              {vibeMap[v] || v}
            </span>
          ))}
        </div>

        {place.foodTags?.length > 0 && (
          <div className="pc-tags">
            {place.foodTags.map(tag => <span key={tag} className="pc-tag">{tag}</span>)}
          </div>
        )}

        {/* Schedule row — program complet + deschis acum */}
        {schedule && (
          <div className="pc-schedule-row">
            <span className="pc-schedule-icon">🕐</span>
            <span className="pc-schedule-time">{schedule}</span>
            <span className={`pc-open-badge ${openNow ? "open" : "closed"}`}>
              {openNow ? "● Deschis acum" : "● Închis acum"}
            </span>
          </div>
        )}

        {place.music && (
          <div className="pc-info-row">
            <span className="pc-info-item">
              <span className="pc-info-icon">🎵</span>
              {Array.isArray(place.music) ? place.music.join(", ") : place.music}
            </span>
          </div>
        )}
      </div>

      <div className="pc-rule" />

      {place.phone && (
        <div className="pc-phone-row">
          <span className="pc-phone-num">📞 {place.phone}</span>
          <button className="pc-copy-btn" onClick={handleCopyPhone}>
            {copied ? "✓" : "Copiază"}
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="pc-actions">
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="pc-btn pc-btn-photos">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          POZE
        </a>

        {place.phone && (
          <button className="pc-btn pc-btn-call" onClick={handleCall}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            SUNĂ
          </button>
        )}

        <button className="pc-btn pc-btn-map" onClick={openDirections}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          DIRECȚII
        </button>
      </div>

      <div className="pc-corner" />
    </div>
  );
}

export default PlaceCard;