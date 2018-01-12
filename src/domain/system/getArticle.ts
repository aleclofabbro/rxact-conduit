// import { GenericError } from './../conduit/api/ErrorResponse';
import { BackEnd } from './backEnd';
import { ArticleResponse } from './../conduit/api/Article';
import ajax from '../../lib/io/ajax';
import { backEnd$ } from './backEnd';
import { ArticleRequest } from '../conduit/api/Article';
import { AxiosResponse } from 'axios';
export const getArticle = (slug: ArticleRequest) =>
  backEnd$.mergeMap<BackEnd, ArticleResponse>(backEnd => ajax<ArticleResponse>(
  {
    ...backEnd,
    url: `articles/${slug}`,
  },
  (response: AxiosResponse) => {
    return [{
      errors: {
        body: [`Article error: ${response.data.error}`]
      }
    }];
  }));