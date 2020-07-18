import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { RecommenderContextProvider } from './context/RecommenderContext';

ReactDOM.render(
  (
    <RecommenderContextProvider>
      <App />
    </RecommenderContextProvider>
  ),
  document.getElementById('root')
);
