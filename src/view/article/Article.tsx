import * as React from 'react';
import { ArticleViewState, getArticle } from '../../domain/view/article';
export const ArticleView = (props: ArticleViewState) => {
  let input: HTMLInputElement | null = null;
  const _getArticle = () => input && getArticle(input.value);
  return (
    <div>
      <input ref={_ => input = _} type="text"/>
      <button onClick={_getArticle}>get</button>
      <pre style={{textAlign: 'left'}}>
        {JSON.stringify(props, null, 4)}
      </pre>
    </div>
  );
};