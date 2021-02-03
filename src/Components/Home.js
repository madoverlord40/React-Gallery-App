import React, { Component } from 'react';
import apiKey from '../config.js';
import Navigation from './Navigation'
import Photo from './Photo'
import NotFound from './NotFound'
import Axios from 'axios';
import { Redirect } from 'react-router';

class Home extends Component {

  state = {
    bSearching: false,
    searchString: "",
    searchResults: [],
    searchSuccessful: false,
    searchCompleted: false,
    bPerformUserSearch: false
  }

  async SearchFor(searchString) {
      let results = [];

      const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchString}&per_page=24&format=json&nojsoncallback=1`;
      console.log(`Axios URL= ${url}`);

      await Axios.get(url).then(responseData => {
            console.log(`Axios Response: ${responseData.status}`)
            let index = 0;
            responseData.data.photos.photo.forEach(element => {
            results[index] = `https://live.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
            index++;
          });
        }).catch(error => {
          console.log('Error fetching and parsing data', error);
        });
      console.log("Finished Building Array of images.");
      return results;
  }

  notifyBeginSearching = (searchString, usrSearch) => {
    let newState = {
      bSearching: true,
      searchString: searchString,
      searchResults: [],
      searchSuccessful: false,
      searchCompleted: false,
      bPerformUserSearch: usrSearch
    }
    this.setState( newState );
  }

  async beginSearchFor(searchString, self) {
    let newState = {
      bSearching: true,
      searchString: searchString,
      searchResults: [],
      searchSuccessful: false,
      searchCompleted: true,
      bPerformUserSearch: false
    };

    let results = await self.SearchFor(searchString);
    
    if(results !== null && results.length > 0) {
      newState.searchResults = results;
      newState.searchSuccessful = true;
    }

    newState.bSearching = false;

    self.setState( newState );
  }

  componentDidMount() {
    if(this.props.search !== null) {
      if(this.props.search === 'usr' && this.props.newsearch !== null) {
        this.notifyBeginSearching(this.props.newsearch, false);
      }
      else if (this.props.search !== 'usr') {
        this.notifyBeginSearching(this.props.search, false);
      }
    }
  }
 
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      if(this.state.bSearching) {
        console.log(`Searching for ${this.state.searchString}`);
          if(this.beginSearchFor(this.state.searchString, this)) {
            console.log(`Search completed: ${this.state.searchResults.length} results`);      
          }
      }
    }
  }
  
  handleSubmit = (e) => {
    
    e.preventDefault();
    let searchForString = this.searchValue.value;
    this.props.notifyRedirect(searchForString);
    this.notifyBeginSearching(searchForString, true);
    
  }

  handleContentLogic() {
   
    if(this.state.bPerformUserSearch) {
      return <Redirect to='/UserSearch' /> 
   }

    if(this.state.searchCompleted === true && 
          this.state.searchSuccessful === true) {
            return ( 
            <div className="App">
              <Navigation/>      
              <Photo searchResults = {this.state.searchResults} />
            </div>
            );
      }
      else if(this.state.searchCompleted === true && 
        this.state.searchSuccessful === false) {          
          return (            
            <div className="App">
              <Navigation/>      
              <NotFound /> 
            </div>
          );
      }
      else {
        return (
          <div className="App">
            <Navigation/>
          </div>
        );
      }

  }
  
  
  render() {
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
        {this.handleContentLogic()}
      </div>
    );
  }
}

export default Home;
