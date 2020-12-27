import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import type { Article } from 'types/Article';
import ArticleHeader from 'components/ArticleHeader';
import { generateArticles } from 'lib/functions';
import styles from 'styles/Home.module.css';

type Props = {
  articles: Article[];
};

const Home: FC<Props> = ({ articles }) => (
  <>
    <Head>
      <title>2754の技術ブログ</title>
      <meta
        name="description"
        content="Web系エンジニア「2754」の個人ブログです。有能謎個人ブログを目指して日々頑張っています。フロントエンド、バックエンド、時々インフラ。"
      />
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
  return { props: { articles } };
};
