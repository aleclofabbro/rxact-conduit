import { Subscription } from '@reactivex/rxjs/dist/package/Subscription';
import { BehaviorSubject } from '@reactivex/rxjs/dist/package/BehaviorSubject';
import { Article } from '../../lib/conduit-domain/Data';
import { isGenericError } from '../../lib/conduit-domain/HttpApi';
import { articleBySlug } from '../../lib/conduit-backoffice/getArticle';
import { Status, ViewState } from './Types';

const setWaiting = (slug: Article['slug']) => articleViewState$.next({
  slug,
  status: Status.Waiting
});

const setArticle = (article: Article) => articleViewState$.next({
  article,
  slug: article.slug,
  status: Status.Show
});

const setArticleError = (slug: Article['slug'], errors: string[]) => articleViewState$.next({
  slug,
  errors,
  status: Status.Error
});
let subscription: Subscription;
// TODO: rendere getArticle -> getArticle$
// ( Subject<Article['slug']>.flatMapLatest )
// eliminare i vari articleViewState$.next
// ma invece:
// fare vome appControl:
// export combineLetest(getArticle$)
export const getArticle = (slug: string) => {
  if (subscription) { subscription.unsubscribe(); }
  setWaiting(slug);
  const subscr = articleBySlug(slug)
    .subscribe(artResp => isGenericError(artResp) ?
      setArticleError(slug, artResp.errors.body) :
      setArticle(artResp.article));
  subscription = subscr;
};
const idleState: ViewState = {
  status: Status.Idle
};
export const articleViewState$ = new BehaviorSubject<ViewState>(idleState);
