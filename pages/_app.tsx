import { FC } from 'react';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

// eslint-disable-next-line import/no-default-export
export default App;
