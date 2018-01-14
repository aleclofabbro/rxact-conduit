import { Article as ArticleType } from './Data';
export namespace Article {
  export const url = (slug: Request) => {
    if (!slug.length) {
      throw 'slug min length: 3';
    }
    return `/articles/${slug}`;
  };
  export const method = 'GET';
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

// TODO: try to avoid `any`
// tslint:disable-next-line:no-any
export function isGenericError(error: any): error is GenericError {
  return !!error && 'errors' in error && 'body' in error.errors && Array.isArray(error.errors.body);
}
