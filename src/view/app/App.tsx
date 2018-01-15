// TODO:
// eliminare dipendenze di app da ../article/**/*
// lasciare al main il wiring
import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import { AppViewState } from './Types';
import { ArticleView } from '../article/Article';

const App = (props: AppViewState) => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div>
        {ArticleView(props.articleView)}
      </div>
    </div>
  );
};

export default App;
