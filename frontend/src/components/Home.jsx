import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/heroImg.jpg';
import './Home.css';
import ProblemStatements from './ProblemStatements';
import Timeline from './Timeline';
import Judges from './Judges';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.13, duration: 0.7, ease: [0.22,1,0.36,1] } }),
};

const team = [
  ['Yukta C', 'Club Coordinator'], ['Mayank Jha', 'Club Coordinator'],
  ['Vishwajit Anand', 'President Tech'], ['Tanmay Shetty', 'Vice-President Tech'],
  ['Shrijani', 'Content Head'], ['Sanjana Prasad', 'Sponsorship Head'],
  ['Abhinav Krishna', 'Social Media Head'], ['Prateek Khatri', 'Design Head'],
];

const faqs = [
  ['What technologies or platforms are allowed?', 'Any programming language, framework, or platform. No restrictions as long as your solution can be demonstrated online.'],
  ['Can I participate individually or is a team required?', 'Teams must have a minimum of 3 and a maximum of 5 members.'],
  ['Will certificates be provided to participants?', 'Yes, all registered participants who submit a valid project will receive a certificate of participation.'],
  ["Is there a code of conduct?", "Yes. All participants must maintain professionalism, respect others, and adhere to the event's code of conduct. Misconduct may lead to disqualification."],
  ['How will updates be shared during the event?', 'Via email and the official Discord server. Please check your registered email regularly.'],
  ["Who can participate?", "Any student pursuing a bachelor's degree."],
  ['Is it fully online?', 'Yes. All ceremonies and mentoring are virtual.'],
];

const TICKER_ITEMS = [
  'AI VERSE 3.0', '48 Hours', 'Dec 7 2026', 'Prize Pool', 'Register Now',
  'Augment AI', 'BMSCE', 'Ideas to Impact', 'Code to Creation', 'Online Hackathon',
];

const suppliedAboutImages = Object.values(import.meta.glob('../../assets/about*.{jpg,jpeg,png,webp}', {
  eager: true, query: '?url', import: 'default',
})).sort();

export default function Home() {
  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const aboutImages = suppliedAboutImages.length ? suppliedAboutImages : [heroImg];

  useEffect(() => {
    if (aboutImages.length < 2) return undefined;
    const t = window.setInterval(() => setAboutImageIndex((i) => (i + 1) % aboutImages.length), 4500);
    return () => window.clearInterval(t);
  }, [aboutImages.length]);

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="nav-logo">AI <span className="accent">VERSE 3.0</span></span>
        <button
          className="nav-toggle" type="button"
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={navOpen} aria-controls="site-navigation"
          onClick={() => setNavOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links${navOpen ? ' is-open' : ''}`} id="site-navigation">
          <li><a href="#problem-statements" onClick={() => setNavOpen(false)}>Problem Statements</a></li>
          <li><a href="#timeline" onClick={() => setNavOpen(false)}>Timeline</a></li>
          <li><a href="#judges" onClick={() => setNavOpen(false)}>Judges</a></li>
          <li><a href="#faq" onClick={() => setNavOpen(false)}>FAQ</a></li>
          <li><a href="#contact" onClick={() => setNavOpen(false)}>Contact</a></li>
          <li><Link to="/register" className="nav-cta" onClick={() => setNavOpen(false)}>Register</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-orbit hero-orbit-1" />
        <div className="hero-orbit hero-orbit-2" />
        <div className="hero-orbit hero-orbit-3" />

        <div className="hero-content">
          <motion.span className="edition-tag" variants={fadeUp} custom={0} initial="hidden" animate="visible">
            AI VERSE 3.0 &nbsp;&middot;&nbsp; 2026
          </motion.span>

          <div className="hero-title-wrap">
            <motion.h1
              data-text="AI VERSE"
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
            >
              AI&nbsp;<span className="accent">VERSE</span>
            </motion.h1>
            <motion.h1
              data-text="3.0"
              variants={fadeUp} custom={1.4} initial="hidden" animate="visible"
              style={{ fontSize: 'clamp(6rem,13vw,13rem)', lineHeight: 0.85, marginTop: '-0.05em' }}
            >
              <span className="accent">3.0</span>
            </motion.h1>
          </div>

          <motion.p className="hero-sub" variants={fadeUp} custom={2.5} initial="hidden" animate="visible">
            Ideas to Impact &nbsp;&middot;&nbsp; Code to Creation
          </motion.p>

          <motion.div className="hero-cta" variants={fadeUp} custom={3} initial="hidden" animate="visible">
            <Link to="/register" className="btn-primary">Register Now</Link>
            <a href="#about" className="btn-outline">About Augment AI</a>
          </motion.div>

          <motion.div className="hero-stats" variants={fadeUp} custom={3.8} initial="hidden" animate="visible">
            <div className="stat"><span>&#8377;50K</span><p>Prize Pool</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>48H</span><p>Duration</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>7 DEC</span><p>2026</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>3&ndash;5</span><p>Team Size</p></div>
          </motion.div>
        </div>

        {/* Right image panel */}
        <div className="hero-image-panel">
          <img src={heroImg} alt="AI Verse hackathon" />
          <div className="hero-image-corner tl" />
          <div className="hero-image-corner tr" />
          <div className="hero-image-corner bl" />
          <div className="hero-image-corner br" />
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={item === '·' ? 'sep' : ''}>{item} <span className="sep">&nbsp;&#9670;&nbsp;</span></span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="about section" id="about">
        <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Who We Are
        </motion.span>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          About Us
        </motion.h2>
        <div className="gold-sep"><span /></div>
        <div className="about-layout">
          <motion.div className="about-image" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <img key={aboutImageIndex} src={aboutImages[aboutImageIndex]} alt="Augment AI community" />
          </motion.div>
          <motion.div className="about-copy" variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3><em>Augment</em> AI</h3>
            <p>Augment AI, an initiative by the Information Science Department at BMS College of Engineering, is a thriving community dedicated to Artificial Intelligence. Our vision is to bring together like-minded individuals who are passionate about AI, fostering learning, collaboration, and innovation.</p>
            <p>Through workshops, projects, and events, we equip students with hands-on experience in AI and its real-world applications. This hackathon challenges participants to build AI-driven solutions that enhance existing services and push the boundaries of what AI can achieve.</p>
          </motion.div>
        </div>
      </section>

      <ProblemStatements />
      <Timeline />
      <Judges />

      {/* TEAM */}
      <section className="team-section section" id="team">
        <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          The People Behind It
        </motion.span>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Team Augment
        </motion.h2>
        <div className="gold-sep"><span /></div>
        <div className="cards-row">
          {team.map(([name, role], i) => (
            <motion.div key={name} className="card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="card-icon" aria-hidden="true">{name.split(' ').map((p) => p[0]).join('').slice(0,2)}</span>
              <h3>{name}</h3>
              <p>{role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section" id="faq">
        <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Got Questions?
        </motion.span>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          FAQ
        </motion.h2>
        <div className="gold-sep"><span /></div>
        <br />
        {faqs.map(([question, answer], i) => (
          <motion.div key={question} className="faq-item" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4>{question}</h4>
            <p>{answer}</p>
          </motion.div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-column">
          <h3>AI-VERSE 3.0</h3>
          <p>48-Hour Online Hackathon.</p>
          <p>Presented by Augment AI</p>
          <p className="footer-copyright">&copy; 2026 Tech Team &mdash; Augment AI</p>
        </div>
        <div className="footer-column">
          <h3>Social</h3>
          <p>Instagram: <a href="https://instagram.com/bmsce_augment.ai" target="_blank" rel="noreferrer">bmsce_augment.ai</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/company/bmsce-augment-ai/" target="_blank" rel="noreferrer">bmsce-augment-ai</a></p>
        </div>
        <address className="footer-column">
          <h3>Contact</h3>
          <p>BMS College Of Engineering, Bangalore</p>
          <p>Email: <a href="mailto:augment_ai@bmsce.ac.in">augment_ai@bmsce.ac.in</a></p>
          <p>Phone: <a href="tel:+919472818251">+91 94728 18251</a></p>
        </address>
      </footer>

    </div>
  );
}
