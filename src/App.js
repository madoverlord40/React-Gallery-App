import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Search from './Components/Search'

class App extends Component {    
  
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Search/:topic" component={Search} />
          <Route path="/NotFound" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
