import fetch from 'node-fetch';
import { Base64 } from 'js-base64';

// https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#get-repository-content
type Content = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: { [key: string]: string };
};

const getRepository = async (endpoint: string) => {
  const repoUrl = process.env.REPOSITORY_URL || '';
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.PERSONAL_ACCESS_TOKEN || ''}`,
  };
  const response = await fetch(`${repoUrl}/${endpoint}?ref=master`, { headers });
  return response.json();
};

const fetchAllFileNames = async () => {
  const contents = (await getRepository('contents')) as Content[];
  const allFileNames = contents.map((content) => content.name);
  return allFileNames;
};

const fetchFileContent = async (fileName: string) => {
  // エンコードなしだと title に日本語が入っていた場合にうまくいかない
  // encodeURI, encodeURIComponent はどっちでも動作したので、他に合わせて encodeURI にする。
  const content = (await getRepository(`contents/${encodeURI(fileName)}`)) as Content;
  const fileContent = Base64.decode(content.content);
  return fileContent;
};

export { fetchAllFileNames, fetchFileContent };
