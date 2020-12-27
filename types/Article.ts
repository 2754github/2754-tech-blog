import type { FrontMatter } from 'types/FrontMatter';

type Article = {
  title: string;
  frontMatter: FrontMatter;
  body: string;
};

// eslint-disable-next-line import/prefer-default-export
export type { Article };
