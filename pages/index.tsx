import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { SITE_TITLE, HOME_DESCRIPTION, SITE_URL } from 'lib/constants';
import type { Article } from 'types/Article';
import ArticleHeader from 'components/ArticleHeader';
import { generateArticles, generateOgpImageUrl } from 'lib/functions';
import styles from 'styles/Home.module.css';

type Props = {
  articles: Article[];
  ogpImageUrl: string;
};

const Home: FC<Props> = ({ articles, ogpImageUrl }) => (
  <>
    <Head>
      <title>{SITE_TITLE}</title>
      <meta name="description" content={HOME_DESCRIPTION} />
      <meta property="og:title" content={SITE_TITLE} />
      <meta property="og:description" content={HOME_DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:image" content={ogpImageUrl} />
    </Head>

    <nav>nav（TBD）</nav>

    <main>
      {articles.map((article) => (
        <Link href={`/articles/${article.title}`} key={article.title}>
          <a className={styles.card}>
            <ArticleHeader article={article} />
          </a>
        </Link>
      ))}
    </main>

    <aside>aside（TBD）</aside>
  </>
);

// eslint-disable-next-line import/no-default-export
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const articles = await generateArticles();
  const ogpImageUrl = generateOgpImageUrl(HOME_DESCRIPTION, 32, -20);
  return { props: { articles, ogpImageUrl } };
};
