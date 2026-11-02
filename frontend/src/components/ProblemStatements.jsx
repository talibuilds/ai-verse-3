import { motion } from 'framer-motion';
import './ProblemStatements.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
};

// Official problem statements will be added here once released.
const problemStatements = [
  { number: '01' },
  { number: '02' },
  { number: '03' },
  { number: '04' },
];

export default function ProblemStatements() {
  return (
    <section className="problem-section section" id="problem-statements">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Problem Statements
      </motion.h2>

      <p className="problem-subtitle">
        The challenges for AI VERSE 3.0 will be announced soon. Stay tuned!
      </p>

      <div className="problem-grid">
        {problemStatements.map((problem, index) => (
          <motion.article
            className="problem-card problem-card-tba"
            key={problem.number}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="problem-number">#{problem.number}</span>
            <div className="problem-tba-icon" aria-hidden="true">✦</div>
            <span className="problem-tba-label">TBA</span>
            <h3>Coming Soon</h3>
            <p>Problem statement details will be revealed soon.</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
