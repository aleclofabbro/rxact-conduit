import { ObservableInput } from '@reactivex/rxjs/dist/package/Observable';
import { Observable, Observer } from '@reactivex/rxjs/dist/package/Rx';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const ajax = <T>(
  config: AxiosRequestConfig,
  mapReject: (resp: AxiosResponse) => ObservableInput<T>
): Observable<T> => Observable.create((observer: Observer<T>) => {
  // https://github.com/mzabriskie/axios#cancellation
  const _axios = axios.create();
  const cancelSource = axios.CancelToken.source();
  const subscription = Observable.fromPromise(_axios.request<T>({
      ...config,
      cancelToken: cancelSource.token
    }))
    .catch(x => Observable.from(mapReject(x.response as AxiosResponse)).map(data => ({data})))
    .map(response => response.data)
    .subscribe(observer);

  return () => {
    subscription.unsubscribe();
    cancelSource.cancel('Operation canceled by the user.');
  };
});

export default ajax;
