import { ReplaySubject } from '@reactivex/rxjs/dist/package/ReplaySubject';
export interface BackEnd {
  baseURL: string;
}
export const backEnd$ = new ReplaySubject<BackEnd>(1);