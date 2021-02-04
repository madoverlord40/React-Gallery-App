import React, { Component } from 'react';

import {
  NavLink, Redirect
} from 'react-router-dom';


class Home extends Component {
    
  //basic stateful component, so we know if the user entered in something from the search box
  state = {
      searchString: "",
      bIsSearching: false
  }

  //handle the form submit and and update the state that we are starting a search
  handleSubmit = (e) => {    
      e.preventDefault();
      
      let newState = {
        searchString: this.searchValue.value,
        bIsSearching: true
      }
      this.setState(newState);
      
  }

    
  render() {
    //if we are starting a search, clear the state, and redirect to the search component, to perform the search and display the resutls.
    if(this.state.bIsSearching) {
        let search = this.state.searchString;

        let newState = {
          searchString: '',
          bIsSearching: false
        }
        this.setState(newState);
        
        return (<Redirect to={`/Search/${search}`} />)
    }

    return (
      <div className="App">
        <div className="container">        
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input type="search" placeholder="Search" ref={ (input) => this.searchValue = input } />
            <button type="submit" className="button">
              <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </button>
          </form>
        </div>
        <nav className="main-nav">
        <ul>
          <li><NavLink to='/Search/Cats'>Cats</NavLink></li>
          <li><NavLink to='/Search/Dogs'>Dogs</NavLink></li>
          <li><NavLink to='/Search/Places'>Places</NavLink></li>
        </ul>
        </nav>
      </div>
    );
  }
}

export default Home;
