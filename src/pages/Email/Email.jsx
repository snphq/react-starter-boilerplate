import React from 'react';
import ContactUs from './ContactUs';
import ContactMe from './ContactMe';
import config from 'config';

import styles from './Email.scss';

const Home = () => (
  <div className={styles.root}>
    <div className={styles.title}>Отправить письмо на {config.mailer.to}</div>
    <ContactUs />
    <div className={styles.title}>
      Отправить письмо на почту введенную пользователем
    </div>
    <ContactMe />
  </div>
);

export default Home;
