// import Article from '../../lib/conduit-domain/data/Article';
import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import { AppViewState } from './Types';
import { ArticleView } from '../article/Article';

const App = ({articleView}: AppViewState) => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div>
        {ArticleView(articleView)}
      </div>
    </div>
  );
};

export default App;
