import { FC } from 'react';
import { AUTHOR, VERCEL_OFFICIAL_URL, TWITTER_URL, REPOSITORY_URL } from 'lib/constants';
import styles from './Footer.module.css';

const Footer: FC = () => (
  <footer className={styles.footer}>
    <p>
      Powered by
      <a href={VERCEL_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">
        <img src="/vercel.svg" alt="Vercel Logo" />
      </a>
    </p>
    <p>
      This blog was created by
      <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
        {AUTHOR}
      </a>
      .
    </p>
    <p>
      The source code is
      <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer">
        here
      </a>
      .
    </p>
  </footer>
);

// eslint-disable-next-line import/no-default-export
export default Footer;
