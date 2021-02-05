import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


import './App.css';
import Home from './Components/Home';
import Error404 from './Components/Error404';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => { return (<Redirect  to="/Search/" />); }} />
          <Route exact path="/Search" component={Home} />
          <Route path="/Search/:topic" component={Home} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
