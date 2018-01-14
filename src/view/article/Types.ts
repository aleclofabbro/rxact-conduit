import { ViewState } from './Types';
import { Article as ArticleApi } from './../../lib/conduit-domain/HttpApi';
import { Article as ArticleType } from '../../lib/conduit-domain/Data';

export enum Status {
  Idle,
  Show,
  Error,
  Waiting
}
type Error = {
  // slug: ArticleType['slug'];
  errors: ArticleApi.Error['errors']['body'];
  status: Status.Error;
};

type Waiting = {
  slug: ArticleType['slug'];
  status: Status.Waiting;
};

type Show = {
  slug: ArticleType['slug'];
  article: ArticleType;
  status: Status.Show;
};

type Idle = {
  status: Status.Idle;
};

export type ViewState = Waiting | Show | Error | Idle;
