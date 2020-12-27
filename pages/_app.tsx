import { FC } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from 'layouts/Layout';
import 'styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#eaeaea" />
      <link rel="icon" href="/2754_logo_192x192.png" />
      <link rel="apple-touch-icon" href="/2754_logo_192x192.png" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@2754_quarter" /> */}
    </Head>
    <Component {...pageProps} />
  </Layout>
);

// eslint-disable-next-line import/no-default-export
export default App;
