import { ArticleViewState as ArticleViewState } from '../article/control';
import { ReplaySubject } from '@reactivex/rxjs/dist/package/ReplaySubject';
export interface AppViewState {
  articleView: ArticleViewState;
}
export const appState$ = new ReplaySubject<AppViewState>(1);
