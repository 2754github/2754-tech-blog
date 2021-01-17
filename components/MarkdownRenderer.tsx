import { FC } from 'react';
import marked from 'marked';
import hljs from 'highlightjs';
import 'highlightjs/styles/docco.css';
import styles from './MarkdownRenderer.module.css';

/* eslint-disable */
type Props = {
  markdown: string;
};

const MarkdownRenderer: FC<Props> = ({ markdown }) => {
  const renderer = new marked.Renderer();
  renderer.heading = (text: string, level: number, raw: string, slugger: any) => {
    const x = Math.min(level + 1, 4); // x: 2~4
    const id = slugger.slug(raw);
    const styleArray = [undefined, undefined, styles.h2, styles.h3, styles.h4];
    return `<h${x} id=${id} class="${styles.hx} ${styleArray[x]}">${text}<a href=#${id}> 📌</a></h${x}>\n`;
  };
  renderer.hr = () => {
    return `<hr class=${styles.hr} />\n`;
  };
  renderer.codespan = (code: string) => {
    return `<code class=${styles.codespan}>${code}</code>`;
  };
  renderer.code = (code: string, lang: string) => {
    const [langType, fileName] = lang.split(':');
    return (
      `<pre class=${styles.pre}>` +
      `<span class=${styles.span}>${fileName}</span>` +
      '<br />' +
      `<code class="language-${langType} ${styles.code}">` +
      hljs.highlightAuto(code, [langType]).value +
      '</code >' +
      '</pre>'
    );
  };
  renderer.table = (header: string, body: string) => {
    if (body) {
      body = `<tbody>${body}</tbody>`;
    }
    return (
      `<table class=${styles.table} border="1" cellspacing="0" cellpadding="10">\n` +
      `<thead class=${styles.thead}>\n${header}</thead>\n${body}` +
      '</table>\n'
    );
  };
  renderer.blockquote = (quote: string) => {
    return `<blockquote class=${styles.blockquote}>\n${quote}</blockquote>\n`;
  };
  renderer.link = (href: string, title: string, text: string) => {
    return `<a class=${styles.a} href=${href} target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  marked.setOptions({ breaks: true, renderer });

  return <section dangerouslySetInnerHTML={{ __html: marked(markdown) }} />;
};

export default MarkdownRenderer;
