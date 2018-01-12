import Article from '../conduit/data/Article';
import { ReplaySubject } from '@reactivex/rxjs/dist/package/ReplaySubject';
import { isGenericError } from '../conduit/api/ErrorResponse';
import { getArticle as _getArticle } from '../system/getArticle';
export interface ArticleViewState {
  article: Article | null;
  slug: Article['slug'] | null;
  waiting: boolean;
  errors: string[] | null;
}
const setWaiting = (slug: Article['slug']) => articleViewState$.next({
  article: null,
  slug,
  waiting: true,
  errors: null
});
const setArticle = (article: Article) => articleViewState$.next({
  article: article,
  slug: article.slug,
  waiting: false,
  errors: null
});
const setArticleError = (errors: string[]) => articleViewState$.next({
  article: null,
  slug: null,
  waiting: false,
  errors
});

export const setIdle = () => articleViewState$.next({
  article: null,
  slug: null,
  waiting: false,
  errors: null
});
export const getArticle = (slug: string) => {
  setWaiting(slug);
  _getArticle(slug)
    .subscribe(artResp => {
      if (isGenericError(artResp)) {
        setArticleError(artResp.errors.body);
      } else {
        setArticle(artResp.article);
      }
    });
}
export const articleViewState$ = new ReplaySubject<ArticleViewState>(1);