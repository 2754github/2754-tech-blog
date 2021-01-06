import { FC } from 'react';
import { useRouter } from 'next/router';
import type { Article } from 'types/Article';
import styles from './ArticleHeader.module.css';

type Props = {
  article: Article;
};

const ArticleHeader: FC<Props> = ({ article }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname === '/' ? <div className={styles.title}>{article.title}</div> : <h1 className={styles.title}>{article.title}</h1>}
      <div className={styles.tags}>
        {article.frontMatter.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className={styles.time}>
        <time dateTime={article.frontMatter.updatedAt} itemProp="modified">
          {article.frontMatter.updatedAt}
        </time>
      </div>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default ArticleHeader;
