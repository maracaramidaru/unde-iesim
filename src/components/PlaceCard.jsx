// src/components/PlaceCard.jsx
import { useState } from "react";

const priceMap = { low: "€", medium: "€€", high: "€€€" };

const vibeMap = {
  specialty: "Specialty Coffee",
  instagram: "Instagramabil",
  date: "Date Night",
  chill: "Cozy",
  trendy: "Trendy",
  party: "Party",
  casual: "Casual",
  remote: "Remote Friendly",
  underground: "Underground",
};

function StarRating({ rating }) {
  return (
    <div className="place-card-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{ color: i < Math.round(rating) ? "#D4A843" : "#ddd", fontSize: "12px" }}
        >★</span>
      ))}
      <span className="place-card-rating-num">{Number(rating).toFixed(1)}</span>
    </div>
  );
}

function PlaceCard({ place }) {
  const [copied, setCopied] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  // Support both `images` (array) and legacy `image` (string)
  const images = place.images
    ? place.images
    : place.image
    ? [place.image]
    : [];

  const totalImages = images.length;

  const nextImage = (e) => {
    e.stopPropagation();
    setImgIndex(prev => (prev + 1) % totalImages);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setImgIndex(prev => (prev - 1 + totalImages) % totalImages);
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, "_blank");
  };

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

  // Normalise category and vibe to arrays
  const categories = Array.isArray(place.category) ? place.category : [place.category];
  const vibes = Array.isArray(place.vibe) ? place.vibe : [place.vibe];

  return (
    <div className="place-card">

      {/* ── Image slider ── */}
      <div className="place-card-img-wrap">
        {images.length > 0 && (
          <img src={images[imgIndex]} alt={place.name} />
        )}

        {totalImages > 1 && (
          <>
            <button className="img-nav img-nav-prev" onClick={prevImage} aria-label="Imaginea anterioară">
              ‹
            </button>
            <button className="img-nav img-nav-next" onClick={nextImage} aria-label="Imaginea următoare">
              ›
            </button>
            <div className="img-dots">
              {images.map((_, i) => (
                <span key={i} className={`img-dot${i === imgIndex ? " active" : ""}`} />
              ))}
            </div>
          </>
        )}

        <div className="place-card-badge-category">
          {categories.join(" · ")}
        </div>
        <div className="place-card-badge-price">
          {priceMap[place.price] || place.price}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="place-card-body">

        <div className="place-card-top-row">
          <div className="place-card-vibe">
            ✦ {vibes.map(v => vibeMap[v] || v).join(", ")}
          </div>
          {place.rating != null && <StarRating rating={place.rating} />}
        </div>

        <h3 className="place-card-name">{place.name}</h3>
        <div className="place-card-address">📍 {place.address}</div>

        <div className="place-card-divider" />

        {place.foodTags && place.foodTags.length > 0 && (
          <div className="place-card-tags">
            {place.foodTags.map(tag => (
              <span key={tag} className="place-card-tag">{tag}</span>
            ))}
          </div>
        )}

        {(place.music || place.closingHour != null) && (
          <div className="place-card-meta">
            {place.music && (
              <span className="place-card-meta-item">
                🎵 {Array.isArray(place.music) ? place.music.join(", ") : place.music}
              </span>
            )}
            {place.closingHour != null && (
              <span className="place-card-meta-item">
                🕐 până la {place.closingHour === 0 ? "00" : place.closingHour}:00
              </span>
            )}
          </div>
        )}

        {place.phone && (
          <div className="place-card-phone-row">
            <span className="place-card-phone">📞 {place.phone}</span>
            <button className="place-card-copy-btn" onClick={handleCopyPhone}>
              {copied ? "✓ Copiat" : "Copiază"}
            </button>
          </div>
        )}

        <div className="place-card-actions">
          {place.phone && (
            <button className="place-card-btn place-card-btn-call" onClick={handleCall}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              REZERVĂ / SUNĂ
            </button>
          )}
          <button className="place-card-btn place-card-btn-directions" onClick={openDirections}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            DIRECȚII
          </button>
        </div>
      </div>

      <div className="place-card-corner" />
    </div>
  );
}

export default PlaceCard;