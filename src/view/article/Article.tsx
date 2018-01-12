import * as React from 'react';
import { ArticleViewState, getArticle } from '../../domain/view/article';
export const ArticleView = (props: ArticleViewState) => {
  let input: HTMLInputElement | null = null;
  const _getArticle = () => input && getArticle(input.value);
  return (
    <div>
      <input ref={_ => input = _} type="text"/>
      <button onClick={_getArticle}>get</button>
      {props.waiting && <span>Fetching...</span>}
      <pre style={{textAlign: 'left'}}>
        {props.article && JSON.stringify(props.article, null, 4)}
        {props.errors && JSON.stringify(props.errors, null, 4)}
      </pre>
    </div>
  );
};