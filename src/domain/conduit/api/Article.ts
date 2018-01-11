import { GenericError } from './ErrorResponse';
import Article from '../data/Article';
export type ArticleRequest = string;

export type ArticleResponse = {
  article: Article
} | GenericError;

