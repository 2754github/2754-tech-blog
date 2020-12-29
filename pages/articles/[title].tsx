import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Article } from 'types/Article';
import ArticleHeader from 'components/ArticleHeader';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { fetchTitles, generateArticle } from 'lib/functions';
import styles from 'styles/ArticlePage.module.css';

type Props = {
  article: Article;
};

const ArticlePage: FC<Props> = ({ article }) => (
  <>
    <Head>
      <title>{article.title}</title>
      {/* <meta name="description" content={`${}`} /> */}
    </Head>

    <nav>nav（TBD）</nav>

    <main>
      <article className={styles.article}>
        <section>
          <ArticleHeader article={article} />
        </section>
        <section>
          <MarkdownRenderer markdown={article.body} />
        </section>
        <section>
          <Link href="/">
            <a>&larr; ホームに戻る</a>
          </Link>
        </section>
      </article>
    </main>

    <aside>aside（TBD）</aside>
  </>
);

// eslint-disable-next-line import/no-default-export
export default ArticlePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const titles = await fetchTitles();
  return {
    paths: titles.map((title) => ({ params: { title: encodeURIComponent(title) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined || typeof params.title !== 'string') {
    return { notFound: true };
  }
  const article = await generateArticle(params.title);
  return { props: { article } };
};
