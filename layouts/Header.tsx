import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SITE_TITLE, SITE_SUBTITLE } from 'lib/constants';
import styles from './Header.module.css';

const Header: FC = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.title}>{router.pathname === '/' ? <h1>{SITE_TITLE}</h1> : SITE_TITLE}</a>
      </Link>
      <div className={styles.description}>{SITE_SUBTITLE}</div>
    </header>
  );
};

// eslint-disable-next-line import/no-default-export
export default Header;
