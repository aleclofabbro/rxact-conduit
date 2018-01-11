// import Article from '../../domain/conduit/data/Article';
import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import { AppViewState } from '../../domain/view/app';
import { ArticleView } from '../article/Article';

const App = (props: AppViewState) => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div>
        <ArticleView {...props.articleView } />
      </div>
    </div>
  );
};

export default App;
