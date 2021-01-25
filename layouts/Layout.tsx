import { FC } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <div className="App">{children}</div>
    <Footer />
  </>
);

// eslint-disable-next-line import/no-default-export
export default Layout;
