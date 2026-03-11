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
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="place-card-stars">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <span key={i} className="star star-full">★</span>;
        if (i === full && half) return <span key={i} className="star star-half">★</span>;
        return <span key={i} className="star star-empty">★</span>;
      })}
      <span className="place-card-rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

function PlaceCard({ place }) {
  const [copied, setCopied] = useState(false);

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${place.phone}`;
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(place.phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="place-card">
      {/* Image */}
      <div className="place-card-img-wrap">
        <img src={place.image} alt={place.name} />
        <div className="place-card-badge-category">{place.category}</div>
        <div className="place-card-badge-price">{priceMap[place.price] || place.price}</div>
      </div>

      {/* Body */}
      <div className="place-card-body">

        {/* Vibe + rating row */}
        <div className="place-card-top-row">
          <div className="place-card-vibe">✦ {vibeMap[place.vibe] || place.vibe}</div>
          {place.rating && <StarRating rating={place.rating} />}
        </div>

        {/* Name */}
        <h3 className="place-card-name">{place.name}</h3>

        {/* Address */}
        <div className="place-card-address">📍 {place.address}</div>

        <div className="place-card-divider" />

        {/* Food tags */}
        {place.foodTags && place.foodTags.length > 0 && (
          <div className="place-card-tags">
            {place.foodTags.map(tag => (
              <span key={tag} className="place-card-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Music & closing hour */}
        {(place.music || place.closingHour) && (
          <div className="place-card-meta">
            {place.music && <span className="place-card-meta-item">🎵 {place.music}</span>}
            {place.closingHour && <span className="place-card-meta-item">🕐 până la {place.closingHour}:00</span>}
          </div>
        )}

        {/* Phone row */}
        {place.phone && (
          <div className="place-card-phone-row">
            <span className="place-card-phone">{place.phone}</span>
            <button
              className="place-card-copy-btn"
              onClick={handleCopyPhone}
              title="Copiază numărul"
            >
              {copied ? "✓ Copiat" : "Copiază"}
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="place-card-actions">
          {place.phone && (
            <button className="place-card-btn place-card-btn-call" onClick={handleCall}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              REZERVĂ
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