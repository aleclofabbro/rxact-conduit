import {ArticleViewState as ArticleViewState} from './article';
import { ReplaySubject } from '@reactivex/rxjs/dist/package/ReplaySubject';
export interface AppViewState {
  articleView: ArticleViewState;
}
export const appState$ = new ReplaySubject<AppViewState>(1);
