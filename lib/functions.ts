import matter from 'gray-matter';
import { fetchAllFileNames, fetchFileContent } from './GitHubAPI';

// https://github.com/jonschlinkert/gray-matter#usage
type MatterResult = {
  content: string;
  data: {
    tags: string;
    updatedAt: string;
    publish: boolean;
  };
};

const formatFileContent = (fileContent: string) => {
  const matterResult = (matter(fileContent) as unknown) as MatterResult; // TODO: 強制型変換
  const { data } = matterResult;
  // TODO: 全ての記事にFrontMatterを設定し終えたら消す。
  const dataIsEmpty = !Object.keys(data).length;
  const tags = dataIsEmpty ? [''] : data.tags.split(' ');
  const { updatedAt, publish } = dataIsEmpty ? { updatedAt: '', publish: false } : data;
  const frontMatter = { tags, updatedAt, publish };
  const body = matterResult.content;
  return { frontMatter, body };
};

const fetchTitles = async () => {
  const allFileNames = await fetchAllFileNames();
  const articleFileNames = allFileNames.filter((fileName) => /\.(md)$/i.exec(fileName));
  const promiseArray = articleFileNames.map(async (fileName) => {
    const fileContent = await fetchFileContent(fileName);
    const { frontMatter } = formatFileContent(fileContent);
    const publishedArticleTitle = frontMatter.publish === true ? fileName.replace(/\.md$/, '') : undefined;
    return publishedArticleTitle;
  });
  const publishedArticleTitles = await Promise.all(promiseArray);
  // TODO: https://qiita.com/Takepepe/items/3db58b10d58ce4fb501f
  const titles = publishedArticleTitles.filter((item) => item !== undefined) as string[];
  return titles;
};

const generateArticles = async () => {
  const titles = await fetchTitles();
  const promiseArray = titles.map(async (title) => {
    const content = await fetchFileContent(`${title}.md`);
    const { frontMatter, body } = formatFileContent(content);
    const article = { title, frontMatter, body };
    return article;
  });
  const articles = await Promise.all(promiseArray);
  articles.sort((a, b) => {
    const A = a.frontMatter.updatedAt;
    const B = b.frontMatter.updatedAt;
    if (A > B) {
      return -1;
    }
    if (A < B) {
      return 1;
    }
    return 0;
  });
  return articles;
};

const generateArticle = async (title: string) => {
  const content = await fetchFileContent(`${title}.md`);
  const { frontMatter, body } = formatFileContent(content);
  const article = { title, frontMatter, body };
  return article;
};

export { fetchTitles, generateArticles, generateArticle };
