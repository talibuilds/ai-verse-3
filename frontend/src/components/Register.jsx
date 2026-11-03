import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Register.css';

const GOOGLE_FORM_URL = '#'; // Replace with actual Google Forms URL when available

export default function Register() {
  return (
    <div className="register-page">
      <nav className="register-nav">
        <Link to="/" className="register-nav-logo">AI <span>VERSE 3.0</span></Link>
      </nav>

      <main className="register-main">
        <motion.div
          className="register-box"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="register-label">AI VERSE 3.0 · 2026</span>
          <h1>Register Your Team</h1>
          <div className="register-sep"><span /></div>
          <p>Registration for AI VERSE 3.0 will open soon. Click the button below when registration goes live to secure your spot in the 48-hour online hackathon.</p>
          <ul className="register-details">
            <li><span>Prize Pool</span> ₹50,000</li>
            <li><span>Team Size</span> 3–5 members</li>
            <li><span>Entry Fee</span> ₹350 per team</li>
            <li><span>Event Date</span> 7 December 2026</li>
          </ul>
          <a
            href={GOOGLE_FORM_URL}
            className="register-btn"
            target="_blank"
            rel="noreferrer"
          >
            Register Now
          </a>
          <Link to="/" className="register-back">← Back to Home</Link>
        </motion.div>
      </main>
    </div>
  );
}
