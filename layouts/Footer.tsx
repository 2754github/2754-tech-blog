import { FC } from 'react';
import { AUTHOR, VERCEL_OFFICIAL_URL, TWITTER_URL, REPOSITORY_URL } from 'lib/constants';
import Anchor from 'components/Anchor';
import styles from './Footer.module.css';

const Footer: FC = () => (
  <footer className={styles.footer}>
    <div>
      Powered by
      <Anchor href={VERCEL_OFFICIAL_URL}>
        <img src="/vercel.svg" alt="Vercel Logo" />
      </Anchor>
    </div>
    <div>
      This blog was created by<Anchor href={TWITTER_URL}>{AUTHOR}</Anchor>.
    </div>
    <div>
      The source code is<Anchor href={REPOSITORY_URL}>here</Anchor>.
    </div>
  </footer>
);

// eslint-disable-next-line import/no-default-export
export default Footer;
