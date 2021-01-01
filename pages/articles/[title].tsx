import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { SITE_URL } from 'lib/constants';
import type { Article } from 'types/Article';
import ArticleHeader from 'components/ArticleHeader';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { fetchTitles, generateArticle, generateDescription, generateOgpImageUrl } from 'lib/functions';
import styles from 'styles/ArticlePage.module.css';

type Props = {
  article: Article;
  description: string;
  ogpImageUrl: string;
};

const ArticlePage: FC<Props> = ({ article, description, ogpImageUrl }) => (
  <>
    <Head>
      <title>{article.title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${SITE_URL}/articles/${article.title}`} />
      <meta property="og:image" content={ogpImageUrl} />
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
  const description = generateDescription(article.body);
  const ogpImageUrl = generateOgpImageUrl(article.title, 40, -60);
  return { props: { article, description, ogpImageUrl } };
};
