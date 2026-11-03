import { motion } from 'framer-motion';
import './Timeline.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (index = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: index * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
};

const timelineItems = [
  { date: 'To be announced', title: 'Registration', description: 'Register your team for AI VERSE 3.0.' },
  { date: 'To be announced', title: 'Problem Statements', description: 'Review the official challenges and choose your problem.' },
  { date: '7 December 2026', title: 'Hackathon Begins', description: 'The 48-hour online hackathon begins.' },
  { date: 'To be announced', title: 'Project Submission', description: 'Submit your completed project before the announced deadline.' },
  { date: 'To be announced', title: 'Results & Closing', description: 'Final evaluation and winner announcements.' },
];

export default function Timeline() {
  return (
    <section className="timeline-section section" id="timeline">
      <motion.span className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        Key Milestones
      </motion.span>
      <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        Timeline
      </motion.h2>
      <div className="gold-sep"><span /></div>

      <p className="timeline-subtitle">
        Important milestones throughout AI VERSE 3.0.
      </p>

      <div className="timeline-container">
        {timelineItems.map((item, index) => (
          <motion.article
            className="timeline-item"
            key={item.title}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="timeline-marker">{String(index + 1).padStart(2, '0')}</div>
            <div className="timeline-card">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
