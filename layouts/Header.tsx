import { FC } from 'react';
import { useRouter } from 'next/router';
import { SITE_TITLE, SITE_SUBTITLE } from 'lib/constants';
import styles from './Header.module.css';

const Header: FC = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={() => router.push('/')}>
        {SITE_TITLE}
      </h1>
      <p className={styles.description}>{SITE_SUBTITLE}</p>
    </header>
  );
};

// eslint-disable-next-line import/no-default-export
export default Header;
