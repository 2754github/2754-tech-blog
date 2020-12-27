import matter from 'gray-matter';
import type { FrontMatter } from 'types/FrontMatter';
import { fetchAllFileNames, fetchFileContent } from './GitHubAPI';

const formatContent = (content: string) => {
  const matterResult = matter(content);
  const frontMatter = matterResult.data as FrontMatter;
  const body = matterResult.content;
  return { frontMatter, body };
};

const fetchTitles = async () => {
  const allFileNames = await fetchAllFileNames();
  const articleFileNames = allFileNames.filter((fileName) => /\.(md)$/i.exec(fileName));
  const promiseArray = articleFileNames.map(async (fileName) => {
    const fileContent = await fetchFileContent(fileName);
    const { frontMatter } = formatContent(fileContent);
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
    const { frontMatter, body } = formatContent(content);
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
  const { frontMatter, body } = formatContent(content);
  const article = { title, frontMatter, body };
  return article;
};

export { fetchTitles, generateArticles, generateArticle };
