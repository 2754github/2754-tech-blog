import { FC } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <div className={styles.layout}>{children}</div>
    <Footer />
  </>
);

// eslint-disable-next-line import/no-default-export
export default Layout;
