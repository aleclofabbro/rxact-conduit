import { Observable } from '@reactivex/rxjs/dist/package/Rx';
// import { GenericError } from '../conduit-domain/api/ErrorResponse';
import { BackEnd } from './config';
import { ArticleResponse } from '../conduit-domain/api/Article';
import ajax from '../io/ajax';
import { backEnd$ } from './config';
import { ArticleRequest } from '../conduit-domain/api/Article';
import { AxiosResponse } from 'axios';
export const getArticle = (slug: ArticleRequest): Observable<ArticleResponse> =>
  backEnd$.mergeMap<BackEnd, ArticleResponse>(backEnd => !slug ?
  [{
    errors: {
      body: ['Specify a slug']
    }
  }] :
  ajax<ArticleResponse>(
  {
    ...backEnd,
    url: `articles/${slug}`,
  },
  (response: AxiosResponse) => {
    // throw(response);
    return [{
      errors: {
        body: [`Article error: ${response.data.error}`]
      }
    }];
  }));