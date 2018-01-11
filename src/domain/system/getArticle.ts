import ajax from '../../lib/io/ajax';
import { backEnd$ } from './backEnd';
import { ArticleRequest, ArticleResponse } from '../conduit/api/Article';
export const getArticle = (slug: ArticleRequest) =>
  backEnd$.mergeMap(backEnd => ajax<ArticleResponse>({
    ...backEnd,
    url: `articles/${slug}`
  }));