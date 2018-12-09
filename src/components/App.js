import React, {Component} from 'react';
import ArticleList from './ArticleList';
import Counter from './Counter';
import Store from '../store';
import Filters from './filtres';
import {Provider} from 'react-redux';
class App extends Component{
  render(){
    return(
        <Provider store={Store}>
          <div>
            <Filters />
            <ArticleList />
            <Counter />
          </div>
        </Provider>
    );
  }
}

export default App;