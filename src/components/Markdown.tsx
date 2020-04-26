import React from 'react';
import showdown from 'showdown';

interface MarkdownInterface {
  text: string,
  extraClass?: string
}

const showdownConverter = new showdown.Converter({ noHeaderId: true });
const Markdown: React.FC<MarkdownInterface> = ({ text, extraClass }) => (
  <div
    dangerouslySetInnerHTML={{ __html: showdownConverter.makeHtml(text) }}
    className={`markdown ${extraClass || ''}`}
  />
);

export default Markdown;