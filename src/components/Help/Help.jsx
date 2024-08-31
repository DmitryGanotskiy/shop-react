import React, { useContext, useState } from 'react';
import styles from './Help.module.css';
import { Context } from '../../context/Cont';
import { assets } from '../../assets/assets';

const Help = () => {
  const { openHelp, setOpenHelp } = useContext(Context);
  const [openAnswers, setOpenAnswers] = useState({});

  const handleClose = () => {
    setOpenHelp(false);
  };

  const toggleAnswer = (index) => {
    setOpenAnswers(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  if (!openHelp) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <img
          src={assets.close_icon}
          alt="Close"
          className={styles.closeIcon}
          onClick={handleClose}
        />
        <div className={styles.faqSection}>
          <div
            className={styles.question}
            onClick={() => toggleAnswer(1)}
          >
            What is this application about?
          </div>
          <div className={`${styles.answer} ${openAnswers[1] ? styles.open : ''}`}>
            This application provides tools to manage and analyze content, track performance, and engage with users.
          </div>
          <div
            className={styles.question}
            onClick={() => toggleAnswer(2)}
          >
            How do I upload content?
          </div>
          <div className={`${styles.answer} ${openAnswers[2] ? styles.open : ''}`}>
            You can upload content by clicking the upload box in the dashboard or by dragging and dropping files into the designated area.
          </div>
          <div
            className={styles.question}
            onClick={() => toggleAnswer(3)}
          >
            Where can I find analytics?
          </div>
          <div className={`${styles.answer} ${openAnswers[3] ? styles.open : ''}`}>
            Analytics can be found in the analytics section of the dashboard, where you can view performance metrics and insights.
          </div>
          <div
            className={styles.question}
            onClick={() => toggleAnswer(4)}
          >
            How do I contact support?
          </div>
          <div className={`${styles.answer} ${openAnswers[4] ? styles.open : ''}`}>
            You can contact support through the contact form in the settings section of your profile.
          </div>
          <div
            className={styles.question}
            onClick={() => toggleAnswer(5)}
          >
            Can I integrate with other tools?
          </div>
          <div className={`${styles.answer} ${openAnswers[5] ? styles.open : ''}`}>
            Yes, the application supports integration with various third-party tools. Check the integrations section in settings for more details.
          </div>
          {/* Add more FAQ items as needed */}
        </div>
      </div>
    </div>
  );
};

export default Help;
