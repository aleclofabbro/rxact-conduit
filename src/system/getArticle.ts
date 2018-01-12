// import { GenericError } from '../lib/conduit-domain/api/ErrorResponse';
import { BackEnd } from './backEnd';
import { ArticleResponse } from '../lib/conduit-domain/api/Article';
import ajax from '../lib/io/ajax';
import { backEnd$ } from './backEnd';
import { ArticleRequest } from '../lib/conduit-domain/api/Article';
import { AxiosResponse } from 'axios';
export const getArticle = (slug: ArticleRequest) =>
  backEnd$.mergeMap<BackEnd, ArticleResponse>(backEnd => ajax<ArticleResponse>(
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