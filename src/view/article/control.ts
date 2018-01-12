import Article from '../../lib/conduit-domain/data/Article';
import { ReplaySubject } from '@reactivex/rxjs/dist/package/ReplaySubject';
import { isGenericError } from '../../lib/conduit-domain/api/ErrorResponse';
import { getArticle as _getArticle } from '../../lib/conduit-back-end/getArticle';

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

const setArticleError = (slug: Article['slug'], errors: string[]) => articleViewState$.next({
  article: null,
  slug,
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
  // const unsub =
  _getArticle(slug)
    .subscribe(artResp => isGenericError(artResp) ?
      setArticleError(slug, artResp.errors.body) :
      setArticle(artResp.article),
      // () =>{
      //   debugger;
      // },
      // () => {
      //   debugger;
      // },
    );
  // setTimeout(()=>{
  //   setIdle();
  //   unsub.unsubscribe();
  // }, 20);
};

export const articleViewState$ = new ReplaySubject<ArticleViewState>(1);