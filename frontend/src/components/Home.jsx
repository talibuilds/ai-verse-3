import { motion } from 'framer-motion';
import heroImg from '../../assets/heroImg.jpg';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <span className="nav-logo">AI<span className="accent">Verse</span></span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#tracks">Tracks</a></li>
          <li><a href="#sponsors">Sponsors</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact" className="nav-cta">Register</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <motion.p className="edition-tag" variants={fadeUp} custom={0} initial="hidden" animate="visible">
            🚀 3rd Edition · 2026
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible">
            AI <span className="accent">Verse</span> 3.0
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp} custom={2} initial="hidden" animate="visible">
            The ultimate college hackathon where artificial intelligence meets creativity.
            Build, innovate, and compete with the brightest minds.
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp} custom={3} initial="hidden" animate="visible">
            <a href="#register" className="btn-primary">Register Now</a>
            <a href="#about" className="btn-outline">Learn More</a>
          </motion.div>
          <motion.div className="hero-stats" variants={fadeUp} custom={4} initial="hidden" animate="visible">
            <div className="stat"><span>500+</span><p>Participants</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>₹1L+</span><p>Prize Pool</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>24hr</span><p>Non-stop</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>20+</span><p>Sponsors</p></div>
          </motion.div>
        </div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <img src={heroImg} alt="AI Verse 3.0" />
          <div className="hero-glow" />
        </motion.div>
      </section>

      {/* About */}
      <section className="about section" id="about">
        <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          What is <span className="accent">AI Verse?</span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          AI Verse is a premier college-level hackathon focused on AI, machine learning, and emerging technologies.
          Teams of 2–4 collaborate over 24 hours to build impactful solutions that push the boundaries of what's possible.
        </motion.p>
        <div className="cards-row">
          {[
            { icon: '🧠', title: 'AI & ML', desc: 'Build intelligent systems using the latest AI models and frameworks.' },
            { icon: '💡', title: 'Innovation', desc: 'Solve real-world problems with creative, out-of-the-box thinking.' },
            { icon: '🤝', title: 'Community', desc: 'Network with fellow builders, mentors, and top industry sponsors.' },
          ].map((c, i) => (
            <motion.div key={c.title} className="card" variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="card-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="tracks section" id="tracks">
        <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Event <span className="accent">Tracks</span>
        </motion.h2>
        <div className="tracks-grid">
          {[
            { icon: '🤖', title: 'Generative AI', desc: 'LLMs, image gen, multimodal AI applications.' },
            { icon: '🏥', title: 'AI for Health', desc: 'Diagnostics, patient care, medical imaging.' },
            { icon: '🌱', title: 'AI for Sustainability', desc: 'Climate, energy, agriculture solutions.' },
            { icon: '🔒', title: 'AI Security', desc: 'Cybersecurity, fraud detection, privacy.' },
            { icon: '📚', title: 'EdTech', desc: 'Personalized learning, accessibility tools.' },
            { icon: '🏙️', title: 'Smart Cities', desc: 'Urban mobility, infrastructure, governance.' },
          ].map((t, i) => (
            <motion.div key={t.title} className="track-card" variants={fadeUp} custom={i * 0.5} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="track-icon">{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section className="sponsors section" id="sponsors">
        <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Our <span className="accent">Sponsors</span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Backed by leading companies in tech and AI.
        </motion.p>
        <div className="sponsor-logos">
          {['Sponsor 1', 'Sponsor 2', 'Sponsor 3', 'Sponsor 4', 'Sponsor 5', 'Sponsor 6'].map((s, i) => (
            <motion.div key={s} className="sponsor-placeholder" variants={fadeUp} custom={i * 0.3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {s}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section" id="faq">
        <motion.h2 variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Frequently Asked <span className="accent">Questions</span>
        </motion.h2>
        {[
          { q: 'Who can participate?', a: 'Any college student from any discipline. All skill levels are welcome!' },
          { q: 'What is the team size?', a: 'Teams of 2 to 4 members. Solo registrations are not allowed.' },
          { q: 'Is there a registration fee?', a: 'No! AI Verse 3.0 is completely free to participate in.' },
          { q: 'Will meals be provided?', a: 'Yes, food and refreshments will be provided throughout the 24-hour event.' },
        ].map((item, i) => (
          <motion.div key={i} className="faq-item" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4>{item.q}</h4>
            <p>{item.a}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 AI Verse 3.0. All rights reserved.</p>
        <p>Made with ❤️ for builders and innovators.</p>
      </footer>
    </div>
  );
}
