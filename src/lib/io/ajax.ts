import { Observable, Observer } from '@reactivex/rxjs/dist/package/Rx';
import axios, { AxiosRequestConfig } from 'axios';
const ajax = <T>(config: AxiosRequestConfig): Observable<T> => Observable.create((observer: Observer<T>) => {
  // https://github.com/mzabriskie/axios#cancellation
  const cancelSource = axios.CancelToken.source();
  const subscription = Observable.fromPromise(axios.request<T>({
    ...config,
    cancelToken: cancelSource.token
  }))
    .map(response => response.data)
    .subscribe(observer);

  return () => {
    subscription.unsubscribe();
    cancelSource.cancel('Operation canceled by the user.');
  };
});

export default ajax;
