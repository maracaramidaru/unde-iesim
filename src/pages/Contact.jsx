// src/pages/Contact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8" }}>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {Array(6).fill("✦ CONTACT ✦ SUGESTII ✦ ADAUGĂ UN LOC NOU ✦ PARTENERIATE ✦ București TONIGHT").join("   ")}
        </div>
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          UNDE<span>IEȘIM</span>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">Locuri</a>
          <a href="/contact" className="nav-link" style={{ borderBottomColor: "#8B1A1A" }}>Contact</a>
        </div>
      </nav>

      {/* Hero band */}
      <div style={{ background: "#8B1A1A", padding: "56px 48px", borderBottom: "2px solid #2C2C2C" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="filter-section-eyebrow" style={{ color: "rgba(245,240,232,0.5)" }}>✦ SCRIE-NE</div>
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(48px, 7vw, 96px)",
            fontWeight: 900,
            color: "#F5F0E8",
            textTransform: "uppercase",
            letterSpacing: "-3px",
            lineHeight: 0.9,
            margin: "12px 0 0"
          }}>
            HAI SĂ<br /><span style={{ color: "#D4A843" }}>VORBIM</span>
          </h1>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 48px", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "64px", alignItems: "start" }}>

        {/* Left — info */}
        <div>
          <div className="filter-section-eyebrow">✦ DE CE SĂ NE CONTACTEZI</div>
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "32px" }}>
            {[
              { icon: "📍", title: "Adaugă un loc nou", desc: "Știi un local mișto care nu e în listă? Trimite-ne adresa și detaliile." },
              { icon: "✏️", title: "Corectează o informație", desc: "Program greșit, număr vechi, adresă schimbată — spune-ne și corectăm." },
              { icon: "🤝", title: "Parteneriate", desc: "Ești proprietar de local și vrei să apari în platformă? Scrie-ne." },
              { icon: "💡", title: "Sugestii & feedback", desc: "Orice idee despre cum putem face platforma mai bună este binevenită." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  width: "44px", height: "44px", background: "#8B1A1A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0
                }}>{icon}</div>
                <div>
                  <div style={{ fontFamily: "'Georgia', serif", fontSize: "15px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.5px", color: "#2C2C2C", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, fontStyle: "italic" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social */}
          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "2px solid #2C2C2C" }}>
            <div className="filter-section-eyebrow" style={{ marginBottom: "16px" }}>✦ SAU GĂSEȘTE-NE PE</div>
            <div style={{ display: "flex", gap: "12px" }}>
              {["Instagram", "TikTok", "Facebook"].map(s => (
                <a key={s} href="#" style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#F5F0E8",
                  background: "#2C2C2C",
                  padding: "8px 16px",
                  textDecoration: "none",
                  transition: "background 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#8B1A1A"}
                onMouseLeave={e => e.currentTarget.style.background = "#2C2C2C"}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div style={{
              background: "#fff",
              border: "2px solid #2C2C2C",
              padding: "48px",
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{ fontSize: "64px", marginBottom: "24px" }}>✦</div>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "28px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-1px", color: "#8B1A1A", marginBottom: "12px" }}>
                Mesaj trimis!
              </h2>
              <p style={{ color: "#666", fontSize: "14px", fontStyle: "italic", lineHeight: 1.7 }}>
                Îți mulțumim. Te contactăm în cel mai scurt timp posibil.
              </p>
              <button
                className="filter-submit-btn"
                style={{ marginTop: "32px" }}
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
              >
                TRIMITE ALT MESAJ
              </button>
              <div style={{ position: "absolute", top: "-2px", left: "-2px", width: "20px", height: "20px", background: "#8B1A1A" }} />
              <div style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "20px", height: "20px", background: "#8B1A1A" }} />
            </div>
          ) : (
            <div className="filter-panel">
              <div className="filter-panel-corner-tl" />
              <div className="filter-panel-corner-br" />
              <div className="filter-panel-eyebrow">✦ FORMULAR DE CONTACT</div>
              <h3 className="filter-panel-title">Trimite un mesaj</h3>
              <div className="filter-panel-divider" />

              <form onSubmit={handleSubmit}>
                <div className="filter-panel-grid">
                  <div className="filter-field">
                    <label htmlFor="name">Numele tău</label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="Ion Popescu"
                      value={form.name} onChange={handleChange}
                      className="contact-input"
                      required
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="ion@example.com"
                      value={form.email} onChange={handleChange}
                      className="contact-input"
                      required
                    />
                  </div>
                </div>

                <div className="filter-field" style={{ marginTop: "24px" }}>
                  <label htmlFor="subject">Subiect</label>
                  <select id="subject" name="subject" onChange={handleChange} value={form.subject} className="filter-field select">
                    <option value="">Alege un subiect</option>
                    <option value="adauga">Adaugă un loc nou</option>
                    <option value="corecteaza">Corectează o informație</option>
                    <option value="parteneriat">Parteneriat</option>
                    <option value="feedback">Feedback / Sugestie</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>

                <div className="filter-field" style={{ marginTop: "24px" }}>
                  <label htmlFor="message">Mesaj</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Scrie mesajul tău aici..."
                    value={form.message} onChange={handleChange}
                    className="contact-input contact-textarea"
                    required
                  />
                </div>

                <button type="submit" className="filter-submit-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  TRIMITE MESAJUL ✦
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Footer text */}
      <div className="footer-text-section">
        <div className="footer-big-text">CONTACT</div>
      </div>
    </div>
  );
}

export default Contact;