import { FC } from 'react';
import styles from './Footer.module.css';

const Footer: FC = () => (
  <footer className={styles.footer}>
    <p>
      Powered by
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/vercel.svg" alt="Vercel Logo" />
      </a>
    </p>
    <p>
      This blog was created by
      <a href="https://twitter.com/2754_quarter" target="_blank" rel="noopener noreferrer">
        2754
      </a>
      .
    </p>
    <p>
      The source code is
      <a href="https://github.com/2754github/2754-tech-blog" target="_blank" rel="noopener noreferrer">
        here
      </a>
      .
    </p>
  </footer>
);

// eslint-disable-next-line import/no-default-export
export default Footer;
