import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { SITE_URL } from 'lib/constants';
import type { Article } from 'types/Article';
import ArticleHeader from 'components/ArticleHeader';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { fetchTitles, generateArticle, generateDescription, generateOgpImageUrl } from 'lib/functions';

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

    <main>
      <article>
        <header className="paper">
          <ArticleHeader article={article} />
        </header>

        {/* section でラップされている ↓ */}
        <MarkdownRenderer className="paper" markdown={article.body} />

        <footer className="paper">
          <Link href="/">
            <a>&larr; ホームに戻る</a>
          </Link>
        </footer>
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
    // エンコードなしだと title に日本語が入っていた場合にうまくいかない
    // encodeURIComponent だと title = "「firebase: command not found」の対処法" の場合にうまくいかない
    paths: titles.map((title) => ({ params: { title: encodeURI(title) } })),
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
