import { backEnd$ } from './lib/conduit-backoffice/config';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './view/app/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { appState$ } from './view/app/control';

appState$.subscribe(state =>
  ReactDOM.render(
    <App {...state} />,
    document.getElementById('root') as HTMLElement
  )
);
registerServiceWorker();

backEnd$.next({
  baseURL: 'https://conduit.productionready.io/api'
});