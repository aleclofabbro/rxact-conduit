import { Article as ArticleType } from './Data';
export namespace Article {
  export const isError = isGenericError;
  export type Request = string;
  export type Value = {
    article: ArticleType
  } | Error;
  export type Error = GenericError;
}

export type GenericError = {
  errors: {
    body: string[];
  }
};

// TODO: try to avoid `any` (should be union of all values)
// tslint:disable-next-line:no-any
export function isGenericError(error: GenericError | any): error is GenericError {
  return !!error && 'errors' in error && 'body' in error.errors && Array.isArray(error.errors.body);
}
