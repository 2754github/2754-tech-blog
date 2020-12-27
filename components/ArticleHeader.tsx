import { FC } from 'react';
import type { Article } from 'types/Article';
import styles from './ArticleHeader.module.css';

type Props = {
  article: Article;
};

const ArticleHeader: FC<Props> = ({ article }) => (
  <>
    <h1 className={styles.title}>{article.title}</h1>
    <div className={styles.tags}>{article.frontMatter.tags}</div>
    <div className={styles.time}>
      <time dateTime={article.frontMatter.updatedAt} itemProp="modified">
        {article.frontMatter.updatedAt}
      </time>
    </div>
  </>
);

// eslint-disable-next-line import/no-default-export
export default ArticleHeader;
