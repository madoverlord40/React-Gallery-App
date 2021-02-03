import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';
import Home from './Components/Home';

class App extends Component {    
  
  storedSearchString = null;

  notifyUserSearchRedirect = (searchstring) => {
      this.storedSearchString = searchstring;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"> <Redirect to="/UserSearch" /> </Route>
          <Route exact path="/UserSearch" component={() => <Home search='usr' newsearch={this.storedSearchString} notifyRedirect={this.notifyUserSearchRedirect} />} />
          <Route exact path="/SearchCats" component={() => <Home search='cats' notifyRedirect={this.notifyUserSearchRedirect}/> } />
          <Route exact path="/SearchDogs" component={() => <Home search='dogs' notifyRedirect={this.notifyUserSearchRedirect}/>} />
          <Route exact path="/SearchComputers" component={() => <Home search='computers' notifyRedirect={this.notifyUserSearchRedirect}/>} />
          <Route exact path="/NotFound" component={() => <Home search='NOTFOUND' notifyRedirect={this.notifyUserSearchRedirect}/>} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
