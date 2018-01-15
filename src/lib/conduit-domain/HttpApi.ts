import * as Api from './Api';
export namespace Article {
  export const url = (slug: Api.Article.Request) => {
    if (!slug.length) {
      throw 'slug min length: 3';
    }
    return `/articles/${slug}`;
  };
  export const method = 'GET';
}
