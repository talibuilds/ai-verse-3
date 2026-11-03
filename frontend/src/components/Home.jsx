import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/heroImg.jpg';
import './Home.css';
import ProblemStatements from './ProblemStatements';
import Timeline from './Timeline';
import Judges from './Judges';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.14, duration: 0.65, ease: 'easeOut' } }),
};

const team = [
  ['Yukta C', 'Club Coordinator'], ['Mayank Jha', 'Club Coordinator'],
  ['Vishwajit Anand', 'President Tech'], ['Tanmay Shetty', 'Vice-President Tech'],
  ['Shrijani', 'Content Head'], ['Sanjana Prasad', 'Sponsorship Head'],
  ['Abhinav Krishna', 'Social Media Head'], ['Prateek Khatri', 'Design Head'],
];

const faqs = [
  ['What technologies or platforms are allowed for project development?', 'You can use any programming language, framework, or platform suitable for your project. There are no restrictions as long as your solution can be demonstrated online.'],
  ['Can I participate individually or is a team required?', 'Teams must have a minimum of 3 and a maximum of 5 members.'],
  ['Will certificates be provided to participants?', 'Yes, all registered participants who submit a valid project will receive a certificate of participation.'],
  ["Is there a code of conduct for participants?", "Yes, all participants are expected to maintain professionalism, respect others, and adhere to the event's code of conduct. Any form of misconduct may lead to disqualification."],
  ['How will communication and updates be shared during the event?', 'All important updates and communications will be shared via email and the official Discord server. Please check your registered email regularly.'],
  ["Who can participate?", "Any student pursuing a bachelor's degree."],
  ['Is it fully online?', 'Yes. All ceremonies and mentoring are virtual.'],
];

const suppliedAboutImages = Object.values(import.meta.glob('../../assets/about*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})).sort();

export default function Home() {
  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const aboutImages = suppliedAboutImages.length ? suppliedAboutImages : [heroImg];

  useEffect(() => {
    if (aboutImages.length < 2) return undefined;
    const timer = window.setInterval(() => setAboutImageIndex((i) => (i + 1) % aboutImages.length), 4500);
    return () => window.clearInterval(timer);
  }, [aboutImages.length]);

  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="navbar">
        <span className="nav-logo">AI <span className="accent">VERSE 3.0</span></span>
        <button
          className="nav-toggle"
          type="button"
          aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={navOpen}
          aria-controls="site-navigation"
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
        <div className="hero-content">
          <motion.span className="edition-tag" variants={fadeUp} custom={0} initial="hidden" animate="visible">
            AI VERSE 3.0 &middot; 2026
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible">
            A <span className="accent">48-Hour</span> Online Hackathon Presented By <span className="accent">Augment AI</span>
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp} custom={2} initial="hidden" animate="visible">
            Ideas to Impact &middot; Code to Creation
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp} custom={3} initial="hidden" animate="visible">
            <Link to="/register" className="btn-primary">Register Now</Link>
            <a href="#about" className="btn-outline">About Augment AI</a>
          </motion.div>
          <motion.div className="hero-stats" variants={fadeUp} custom={4} initial="hidden" animate="visible">
            <div className="stat"><span>&#8377;50,000</span><p>Prize Pool</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>&#8377;350</span><p>Per Team</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>7 Dec 2026</span><p>Event Date</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>3&ndash;5</span><p>Team Size</p></div>
          </motion.div>
        </div>
        <motion.div
          className="hero-image hero-main-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <img src={heroImg} alt="AI Verse hackathon" />
          <div className="hero-glow" />
        </motion.div>
      </section>

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
          <motion.div className="hero-image about-image" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <img key={aboutImageIndex} src={aboutImages[aboutImageIndex]} alt="Augment AI community" />
            <div className="hero-glow" />
          </motion.div>
          <motion.div className="about-copy" variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3>Augment AI</h3>
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
          {team.map(([name, role], index) => (
            <motion.div key={name} className="card" variants={fadeUp} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="card-icon" aria-hidden="true">{name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
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
          Frequently Asked Questions
        </motion.h2>
        <div className="gold-sep"><span /></div>
        <br />
        {faqs.map(([question, answer], index) => (
          <motion.div key={question} className="faq-item" variants={fadeUp} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
          <h3>Social Handles</h3>
          <p>Instagram: <a href="https://instagram.com/bmsce_augment.ai" target="_blank" rel="noreferrer">bmsce_augment.ai</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/company/bmsce-augment-ai/" target="_blank" rel="noreferrer">bmsce-augment-ai</a></p>
        </div>
        <address className="footer-column">
          <h3>Contact Us</h3>
          <p>BMS College Of Engineering, Bangalore</p>
          <p>Email: <a href="mailto:augment_ai@bmsce.ac.in">augment_ai@bmsce.ac.in</a></p>
          <p>Phone: <a href="tel:+919472818251">+91 94728 18251</a></p>
        </address>
      </footer>
    </div>
  );
}
