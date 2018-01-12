import { backEnd$ } from './system/backEnd';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './view/app/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { appState$, AppViewState } from './view/app/control';
import { articleViewState$, setIdle as setIdleArticleView, ArticleViewState } from './view/article/control';

appState$.subscribe(state =>
  ReactDOM.render(
    <App {...state} />,
    document.getElementById('root') as HTMLElement
  )
);
registerServiceWorker();

Observable.combineLatest<ArticleViewState, AppViewState>
  (
    articleViewState$,
    (articleView) => ({
      articleView
    })
  ).subscribe(appState$);

setIdleArticleView();

backEnd$.next({
  baseURL: 'https://conduit.productionready.io/api'
});
