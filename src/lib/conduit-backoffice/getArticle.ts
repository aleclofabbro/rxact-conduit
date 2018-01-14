import { backEnd$ } from './config';
import ajax from '../io/ajax';
import { AxiosResponse } from 'axios';
import { Observable } from '@reactivex/rxjs/dist/package/Rx';
import { Article as ArticleApi } from '../conduit-domain/HttpApi';

export interface BackEnd {
  baseURL: string;
}

export const articleBySlug = (slug: ArticleApi.Request): Observable<ArticleApi.Value> =>
  backEnd$.mergeMap<BackEnd, ArticleApi.Value>(backEnd => !slug ?
  [{
    errors: {
      body: ['Specify a slug']
    }
  }] :
  ajax<ArticleApi.Value>(
  {
    ...backEnd,
    method: ArticleApi.method,
    url: ArticleApi.url(slug),
  },
  (response: AxiosResponse) => {
    // throw(response);
    return [{
      errors: {
        body: [`Article error: ${response.data.error}`]
      }
    }];
  }));