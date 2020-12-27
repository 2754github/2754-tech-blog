import { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

const Header: FC = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={() => router.push('/')}>
        2754の技術ブログ
      </h1>
      <p className={styles.description}>Web系エンジニアの備忘録</p>
    </header>
  );
};

// eslint-disable-next-line import/no-default-export
export default Header;
