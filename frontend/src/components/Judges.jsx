import { motion } from 'framer-motion';
import './Judges.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
};

// Replace these placeholders with confirmed judge names, roles and profile photos.
const judges = [
  { name: 'To Be Announced', role: 'Judge', organization: 'AI VERSE 3.0' },
  { name: 'To Be Announced', role: 'Judge', organization: 'AI VERSE 3.0' },
  { name: 'To Be Announced', role: 'Judge', organization: 'AI VERSE 3.0' },
];

export default function Judges() {
  return (
    <section className="judges-section section" id="judges">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Judges
      </motion.h2>

      <p className="judges-subtitle">
        Meet the experts who will evaluate the projects.
      </p>

      <div className="judges-grid">
        {judges.map((judge, index) => (
          <motion.article
            className="judge-card"
            key={index}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="judge-avatar" aria-hidden="true">👤</div>
            <h3>{judge.name}</h3>
            <p className="judge-role">{judge.role}</p>
            <span className="judge-organization">{judge.organization}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
