// src/pages/Contact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const reasons = [
  { icon: "📍", title: "Adaugă un loc nou", desc: "Știi un local mișto care nu e în listă? Trimite-ne adresa și detaliile." },
  { icon: "✏️", title: "Corectează o informație", desc: "Program greșit, număr vechi, adresă schimbată — spune-ne și corectăm." },
  { icon: "🤝", title: "Parteneriate", desc: "Ești proprietar de local și vrei să apari în platformă? Scrie-ne." },
  { icon: "💡", title: "Sugestii & feedback", desc: "Orice idee despre cum putem face platforma mai bună este binevenită." },
];

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
    <div className="contact-page">

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {Array(6).fill("✦ CONTACT ✦ SUGESTII ✦ ADAUGĂ UN LOC NOU ✦ PARTENERIATE ✦ BUCUREȘTI TONIGHT").join("   ")}
        </div>
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>
          UNDE<span>IEȘIM</span>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">Locuri</a>
          <a href="/contact" className="nav-link nav-link-active">Contact</a>
        </div>
      </nav>

      {/* Hero band */}
      <div className="contact-hero">
        <div className="contact-hero-inner">
          <div className="filter-section-eyebrow contact-hero-eyebrow">✦ SCRIE-NE</div>
          <h1 className="contact-hero-title">
            HAI SĂ<br /><span>VORBIM</span>
          </h1>
          <p className="contact-hero-desc">
            Ai un local de adăugat, o eroare de corectat sau vrei să colaborăm?
            Răspundem în 24h.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="contact-content">

        {/* Left — reasons */}
        <div className="contact-left">
          <div className="filter-section-eyebrow">✦ DE CE SĂ NE CONTACTEZI</div>
          <div className="contact-reasons">
            {reasons.map(({ icon, title, desc }) => (
              <div key={title} className="contact-reason">
                <div className="contact-reason-icon">{icon}</div>
                <div>
                  <div className="contact-reason-title">{title}</div>
                  <div className="contact-reason-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-social">
            <div className="filter-section-eyebrow contact-social-eyebrow">✦ SAU GĂSEȘTE-NE PE</div>
            <div className="contact-social-links">
              {["Instagram", "TikTok", "Facebook"].map(s => (
                <a key={s} href="#" className="contact-social-btn">{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-right">
          {sent ? (
            <div className="contact-sent">
              <div className="contact-sent-icon">✦</div>
              <h2 className="contact-sent-title">Mesaj trimis!</h2>
              <p className="contact-sent-desc">
                Îți mulțumim. Te contactăm în cel mai scurt timp posibil.
              </p>
              <button
                className="filter-submit-btn"
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
              >
                TRIMITE ALT MESAJ
              </button>
              <div className="contact-sent-corner-tl" />
              <div className="contact-sent-corner-br" />
            </div>
          ) : (
            <div className="filter-panel">
              <div className="filter-panel-corner-tl" />
              <div className="filter-panel-corner-br" />
              <div className="filter-panel-eyebrow">✦ FORMULAR DE CONTACT</div>
              <h3 className="filter-panel-title">Trimite un mesaj</h3>
              <div className="filter-panel-divider" />

              <form onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="filter-field">
                    <label htmlFor="name">Numele tău</label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="Ion Popescu"
                      value={form.name} onChange={handleChange}
                      className="contact-input" required
                    />
                  </div>
                  <div className="filter-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="ion@example.com"
                      value={form.email} onChange={handleChange}
                      className="contact-input" required
                    />
                  </div>
                </div>

                <div className="filter-field contact-field-mt">
                  <label htmlFor="subject">Subiect</label>
                  <select id="subject" name="subject" onChange={handleChange} value={form.subject}>
                    <option value="">Alege un subiect</option>
                    <option value="adauga">Adaugă un loc nou</option>
                    <option value="corecteaza">Corectează o informație</option>
                    <option value="parteneriat">Parteneriat</option>
                    <option value="feedback">Feedback / Sugestie</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>

                <div className="filter-field contact-field-mt">
                  <label htmlFor="message">Mesaj</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Scrie mesajul tău aici..."
                    value={form.message} onChange={handleChange}
                    className="contact-textarea" required
                  />
                </div>

                <button type="submit" className="filter-submit-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  TRIMITE MESAJUL ✦
                </button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="footer-text-section">
        <div className="footer-big-text">CONTACT</div>
      </div>

    </div>
  );
}

export default Contact;