import React, { Component } from 'react';

class Navigation extends Component {    
  
    render() {
        return (
        <nav className="main-nav">
        <ul>
          <li><a href='/SearchCats' >Cats</a></li>
          <li><a href='/SearchDogs' >Dogs</a></li>
          <li><a href='/SearchComputers' >Computers</a></li>
        </ul>
        </nav>

        );
    }
}

export default Navigation;


