
import { useCallback, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/heroImg.jpg';
import './Home.css';
import ProblemStatements from './ProblemStatements';
import Timeline from './Timeline';
import Judges from './Judges';
import ParticleCanvas from './ParticleCanvas';
import Countdown from './Countdown';
import IntroScreen from './IntroScreen';

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const team = [
  ['Yukta C', 'Club Coordinator'],
  ['Mayank Jha', 'Club Coordinator'],
  ['Vishwajit Anand', 'President Tech'],
  ['Tanmay Shetty', 'Vice-President Tech'],
  ['Shrijani', 'Content Head'],
  ['Sanjana Prasad', 'Sponsorship Head'],
  ['Abhinav Krishna', 'Social Media Head'],
  ['Prateek Khatri', 'Design Head'],
];

const faqs = [
  [
    'What technologies or platforms are allowed?',
    'Any programming language, framework, or platform. No restrictions as long as your solution can be demonstrated online.',
  ],
  [
    'Can I participate individually or is a team required?',
    'Teams must have a minimum of 3 and a maximum of 5 members.',
  ],
  [
    'Will certificates be provided to participants?',
    'Yes, all registered participants who submit a valid project will receive a certificate of participation.',
  ],
  [
    'Is there a code of conduct?',
    "Yes. All participants must maintain professionalism, respect others, and adhere to the event's code of conduct. Misconduct may lead to disqualification.",
  ],
  [
    'How will updates be shared during the event?',
    'Via email and the official Discord server. Please check your registered email regularly.',
  ],
  [
    'Who can participate?',
    "Any student pursuing a bachelor's degree.",
  ],
  [
    'Is it fully online?',
    'Yes. All ceremonies and mentoring are virtual.',
  ],
];

const TICKER_ITEMS = [
  'AI VERSE 3.0',
  '48 Hours',
  'Dec 7 2026',
  '₹50,000 Prize Pool',
  'Register Now',
  'Augment AI',
  'BMSCE',
  'Ideas to Impact',
  'Code to Creation',
  'Online Hackathon',
  'Team Size 3–5',
  'Entry ₹350',
];

const suppliedAboutImages = Object.values(
  import.meta.glob('../../assets/*.{jpg,jpeg,png,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
).sort();

export default function Home() {
  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Image fallback states
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [failedAboutImages, setFailedAboutImages] = useState([]);

  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem('av3_intro_seen')
  );

  const shouldReduceMotion = useReducedMotion();

  const aboutImages = suppliedAboutImages.filter(
    (src) => !src.includes('heroImg')
  );

  // Keep the intro completion callback stable.
  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem('av3_intro_seen', '1');
    setShowIntro(false);
  }, []);

  // Smoothly scroll to the top when the logo is clicked.
  const handleLogoClick = (e) => {
    e.preventDefault();

    setNavOpen(false);

    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  // Cursor spotlight - only enabled on desktop devices.
  const spotX = useMotionValue(-300);
  const spotY = useMotionValue(-300);

  const springX = useSpring(spotX, {
    stiffness: 120,
    damping: 20,
  });

  const springY = useSpring(spotY, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    if (!pointerQuery.matches || shouldReduceMotion) {
      return undefined;
    }

    const move = (e) => {
      spotX.set(e.clientX);
      spotY.set(e.clientY);
    };

    window.addEventListener('mousemove', move, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [spotX, spotY, shouldReduceMotion]);

  // About image carousel - dynamically adapts to screen size.
  useEffect(() => {
    if (aboutImages.length < 2 || shouldReduceMotion) {
      return undefined;
    }

    const mobileQuery = window.matchMedia(
      '(max-width: 768px)'
    );

    let timer;

    const startCarousel = () => {
      // Clear the previous interval before applying new timing.
      window.clearInterval(timer);

      const interval = mobileQuery.matches ? 6500 : 4500;

      timer = window.setInterval(() => {
        setAboutImageIndex(
          (index) => (index + 1) % aboutImages.length
        );
      }, interval);
    };

    // Start with the current screen size.
    startCarousel();

    // Restart automatically whenever the screen crosses 768px.
    mobileQuery.addEventListener('change', startCarousel);

    return () => {
      window.clearInterval(timer);
      mobileQuery.removeEventListener('change', startCarousel);
    };
  }, [aboutImages.length, shouldReduceMotion]);

  return (
    <div className="home">
      {showIntro && <IntroScreen onDone={handleIntroDone} />}

      <ParticleCanvas />

      {/* CURSOR SPOTLIGHT */}
      <motion.div
        className="cursor-spotlight"
        style={{
          left: springX,
          top: springY,
        }}
        aria-hidden="true"
      />

      {/* NAVBAR */}
      <nav className="navbar">
        <a
          href="#home"
          className="nav-logo"
          onClick={handleLogoClick}
          aria-label="AI Verse 3.0 - Back to top"
        >
          AI <span className="accent">VERSE 3.0</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={navOpen}
          aria-controls="site-navigation"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          className={`nav-links${navOpen ? ' is-open' : ''}`}
          id="site-navigation"
        >
          <li>
            <a
              href="#problem-statements"
              onClick={() => setNavOpen(false)}
            >
              Problem Statements
            </a>
          </li>

          <li>
            <a
              href="#timeline"
              onClick={() => setNavOpen(false)}
            >
              Timeline
            </a>
          </li>

          <li>
            <a
              href="#judges"
              onClick={() => setNavOpen(false)}
            >
              Judges
            </a>
          </li>

          <li>
            <a
              href="#faq"
              onClick={() => setNavOpen(false)}
            >
              FAQ
            </a>
          </li>

          <li>
            <a
              href="#contact"
              onClick={() => setNavOpen(false)}
            >
              Contact
            </a>
          </li>

          <li>
            <Link
              to="/register"
              className="nav-cta"
              onClick={() => setNavOpen(false)}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-orbit hero-orbit-1" />
        <div className="hero-orbit hero-orbit-2" />
        <div className="hero-orbit hero-orbit-3" />

        <div className="hero-content">
          <motion.span
            className="edition-tag"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <span className="live-dot" aria-hidden="true" />
            AI VERSE 3.0 &nbsp;&middot;&nbsp; 2026
          </motion.span>

          <motion.div
            className="hero-title-wrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="hero-h1-line1">
              <span
                className="glitch-wrap title-white"
                data-text="AI VERSE"
                aria-label="AI VERSE"
              >
                AI VERSE
              </span>
            </h1>

            <h1 className="hero-h1-line2">
              <span
                className="glitch-wrap title-gold"
                data-text="3.0"
                aria-label="3.0"
              >
                3.0
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="hero-sub"
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
          >
            Ideas to Impact &nbsp;&middot;&nbsp; Code to Creation
          </motion.p>

          <motion.div
            className="hero-cta"
            variants={fadeUp}
            custom={3.6}
            initial="hidden"
            animate="visible"
          >
            <Link to="/register" className="btn-primary">
              <span className="btn-inner">Register Now</span>
              <span className="btn-shine" aria-hidden="true" />
            </Link>

            <a href="#about" className="btn-outline">
              About Augment AI
            </a>
          </motion.div>

          <Countdown />
        </div>

        {/* RIGHT IMAGE PANEL */}
        <div
          className={`hero-image-panel${
            heroImageFailed ? ' hero-image-failed' : ''
          }`}
        >
          {!heroImageFailed ? (
            <img
              src={heroImg}
              alt="AI Verse hackathon"
              onError={() => setHeroImageFailed(true)}
            />
          ) : (
            <div
              className="image-fallback image-fallback--hero"
              role="img"
              aria-label="AI VERSE 3.0 event image unavailable"
            >
              <span className="image-fallback-title">
                AI VERSE <strong>3.0</strong>
              </span>

              <span className="image-fallback-subtitle">
                Ideas to Impact · Code to Creation
              </span>
            </div>
          )}

          <div className="hero-image-corner tl" />
          <div className="hero-image-corner tr" />
          <div className="hero-image-corner bl" />
          <div className="hero-image-corner br" />

          <motion.div
            className="hero-stat-badge"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="hsb-value">₹50K</span>
            <span className="hsb-label">Prize Pool</span>
          </motion.div>

          <motion.div
            className="hero-stat-badge hero-stat-badge--b"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.5,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="hsb-value">48H</span>
            <span className="hsb-label">Non-Stop</span>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>
              {item}
              <span className="sep">&nbsp;&#9670;&nbsp;</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        {[
          { v: '₹50,000', l: 'Prize Pool' },
          { v: '48', l: 'Hours' },
          { v: '7 DEC', l: '2026' },
          { v: '3–5', l: 'Team Size' },
          { v: '₹350', l: 'Entry Fee' },
        ].map(({ v, l }, i) => (
          <motion.div
            key={l}
            className="stats-bar-item"
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.06 }
            }
          >
            <span className="stats-bar-val">{v}</span>
            <span className="stats-bar-label">{l}</span>
          </motion.div>
        ))}
      </div>

      {/* ABOUT */}
      <section className="about section" id="about">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Who We Are
        </motion.span>

        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About Us
        </motion.h2>

        <div className="gold-sep">
          <span />
        </div>

        <div className="about-layout">
          <motion.div
            className="about-image"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {aboutImages.length > 0 && (
              failedAboutImages.includes(
                aboutImages[aboutImageIndex]
              ) ? (
                <div
                  className="image-fallback image-fallback--about"
                  role="img"
                  aria-label="Augment AI community photo unavailable"
                >
                  <span className="image-fallback-title">
                    AUGMENT <strong>AI</strong>
                  </span>

                  <span className="image-fallback-subtitle">
                    Learning · Collaboration · Innovation
                  </span>
                </div>
              ) : (
                <motion.img
                  key={aboutImages[aboutImageIndex]}
                  src={aboutImages[aboutImageIndex]}
                  alt={`Augment AI community ${aboutImageIndex + 1}`}
                  onError={() => {
                    const failedImage = aboutImages[aboutImageIndex];

                    setFailedAboutImages((previous) =>
                      previous.includes(failedImage)
                        ? previous
                        : [...previous, failedImage]
                    );
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.8,
                    ease: 'easeInOut',
                  }}
                />
              )
            )}

            <div className="about-image-dots">
              {aboutImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`about-dot${
                    i === aboutImageIndex ? ' about-dot--active' : ''
                  }`}
                  onClick={() => setAboutImageIndex(i)}
                  aria-label={`Show community photo ${i + 1}`}
                  aria-current={
                    i === aboutImageIndex ? 'true' : undefined
                  }
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-copy"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>
              <em>Augment</em> AI
            </h3>

            <p>
              Augment AI, an initiative by the Information Science Department
              at BMS College of Engineering, is a thriving community dedicated
              to Artificial Intelligence. Our vision is to bring together
              like-minded individuals who are passionate about AI, fostering
              learning, collaboration, and innovation.
            </p>

            <p>
              Through workshops, projects, and events, we equip students
              with hands-on experience in AI and its real-world applications.
              This hackathon challenges participants to build AI-driven
              solutions that enhance existing services and push the
              boundaries of what AI can achieve.
            </p>
          </motion.div>
        </div>
      </section>

      <ProblemStatements />
      <Timeline />
      <Judges />

      {/* TEAM */}
      <section className="team-section section" id="team">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          The People Behind It
        </motion.span>

        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Team Augment
        </motion.h2>

        <div className="gold-sep">
          <span />
        </div>

        <div className="cards-row">
          {team.map(([name, role], i) => (
            <motion.div
              key={name}
              className="card"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      transition: { duration: 0.2 },
                    }
              }
            >
              <span className="card-icon" aria-hidden="true">
                {name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)}
              </span>

              <h3>{name}</h3>
              <p>{role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section" id="faq">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Got Questions?
        </motion.span>

        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          FAQ
        </motion.h2>

        <div className="gold-sep">
          <span />
        </div>

        <br />

        {faqs.map(([question, answer], i) => {
          const isOpen = openFaq === i;
          const questionId = `faq-question-${i}`;
          const answerId = `faq-answer-${i}`;

          return (
            <motion.div
              key={question}
              className={`faq-item${isOpen ? ' faq-open' : ''}`}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <button
                id={questionId}
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenFaq(isOpen ? null : i)}
              >
                <span className="faq-question">{question}</span>

                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <motion.div
                id={answerId}
                className="faq-a"
                role="region"
                aria-labelledby={questionId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                initial={false}
                animate={{
                  height: isOpen ? 'auto' : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: 'easeInOut',
                }}
                style={{ overflow: 'hidden' }}
              >
                <p>{answer}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-column">
          <h3>AI-VERSE 3.0</h3>
          <p>48-Hour Online Hackathon.</p>
          <p>Presented by Augment AI</p>
          <p className="footer-copyright">
            &copy; 2026 Tech Team &mdash; Augment AI
          </p>
        </div>

        <div className="footer-column">
          <h3>Social</h3>

          <p>
            Instagram:{' '}
            <a
              href="https://instagram.com/bmsce_augment.ai"
              target="_blank"
              rel="noreferrer"
            >
              bmsce_augment.ai
            </a>
          </p>

          <p>
            LinkedIn:{' '}
            <a
              href="https://www.linkedin.com/company/bmsce-augment-ai/"
              target="_blank"
              rel="noreferrer"
            >
              bmsce-augment-ai
            </a>
          </p>
        </div>

        <address className="footer-column">
          <h3>Contact</h3>
          <p>BMS College Of Engineering, Bangalore</p>

          <p>
            Email:{' '}
            <a href="mailto:augment_ai@bmsce.ac.in">
              augment_ai@bmsce.ac.in
            </a>
          </p>

          <p>
            Phone:{' '}
            <a href="tel:+919472818251">
              +91 94728 18251
            </a>
          </p>
        </address>
      </footer>
    </div>
  );
}
