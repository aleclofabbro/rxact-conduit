import { Subject } from '@reactivex/rxjs/dist/package/Subject';
import { Article } from '../../lib/conduit-domain/Data';
import { Article as ArticleApi, isGenericError } from '../../lib/conduit-domain/Api';
import { articleBySlug } from '../../lib/conduit-backoffice/getArticle';
import { Status, ViewState } from './Types';
import { Observable } from '@reactivex/rxjs/dist/package/Observable';

const setWaiting = (slug: Article['slug']): ViewState => ({
  slug,
  status: Status.Waiting
});

const setArticle = (article: Article): ViewState => ({
  article,
  slug: article.slug,
  status: Status.Show
});

const setArticleError = (errors: string[]): ViewState => ({
  // slug,
  errors,
  status: Status.Error
});
const getArticle$ = new Subject<Article['slug']>();

const articleResp$ = getArticle$
  .switchMap<Article['slug'], ArticleApi.Value>(slug => articleBySlug(slug))
  .map(artResp => {
    const articleResponse = isGenericError(artResp) ?
      setArticleError(artResp.errors.body) :
      setArticle(artResp.article);
    return articleResponse;
  });
const idleState: ViewState = {
  status: Status.Idle
};

export const getArticle = getArticle$.next.bind(getArticle$);
export const articleViewState$ = Observable.merge(
  getArticle$.map(setWaiting),
  articleResp$
)
.startWith(idleState);
