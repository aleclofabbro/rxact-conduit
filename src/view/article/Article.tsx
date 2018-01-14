import * as React from 'react';
import { ViewState, Status } from './Types';
import { getArticle } from './control';
export const ArticleView = (props: ViewState) => {
  let input: HTMLInputElement | null = null;
  const _getArticle = () => input && getArticle(input.value);
  return (
    <div>
      <input ref={_ => input = _} type="text"/>
      <button onClick={_getArticle}>get</button>
      <br/>
      <span>
        {props.status === Status.Waiting && <span>Fetching..{props.slug}.</span>}
      </span>
      <pre style={{textAlign: 'left'}}>
        {props.status === Status.Show && JSON.stringify(props.article, null, 4)}
        {props.status === Status.Error && JSON.stringify(props.errors, null, 4)}
      </pre>
    </div>
  );
};