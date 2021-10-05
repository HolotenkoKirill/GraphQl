import React from 'react';
import './App.css';
import LazyQuery from './components/LazyQuery';
import Mutation from './components/Mutation';
import Query from './components/Query';

function App(): JSX.Element {
  return (
    <div className="App">
      <Query />
      <hr />
      <LazyQuery />
      <hr />
      <Mutation />
    </div>
  );
}

export default App;
