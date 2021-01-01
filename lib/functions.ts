import matter from 'gray-matter';
import marked from 'marked';
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

const generateDescription = (markdown: string) => {
  const html = marked(markdown) as string;
  const paragraphs = html.match(/<p>.*?<\/p>/g);
  const paragraphArray = paragraphs?.map((paragraph) => unEscapeHTML(paragraph.replace(/<.*?>/g, '')));
  const description = paragraphArray?.join(' ').slice(0, 150);
  return description;
};

const unEscapeHTML = (text: string) =>
  text
    .replace(/(&lt;)/g, '<')
    .replace(/(&gt;)/g, '>')
    .replace(/(&quot;)/g, '"')
    .replace(/(&#39;)/g, "'")
    .replace(/(&amp;)/g, '&');

const generateOgpImageUrl = (title: string, fontSize: number, y: number) => {
  const ogpUrl = process.env.OGP_URL || '';
  const ogpQuery = `l_text:Sawarabi%20Gothic_${fontSize}_bold:${title},y_${y},x_0,w_600,c_fit,co_rgb:000000`;
  const ogpBgImage = process.env.OGP_BG_IMAGE || '';
  const ogpImageUrl = `${ogpUrl}/${ogpQuery}/${ogpBgImage}`;
  return ogpImageUrl;
};

export { fetchTitles, generateArticles, generateArticle, generateDescription, generateOgpImageUrl };
