import { AppViewState } from './Types';
import { articleViewState$ } from '../article/control';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { ViewState as ArticleViewState } from '../article/Types';

export const appState$ = Observable.combineLatest<ArticleViewState, AppViewState>
  (
    articleViewState$,
    (
      articleView
    ) => ({
      articleView
    })
  );
export default appState$;
