import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import apiKey from './config.js';
import Home from './Components/Home';
import Navigation from './Components/Navigation'
import Photo from './Components/Photo'
import NotFound from './Components/NotFound'
import Axios from 'axios';


class App extends Component {    
  
  state = {
    bSearching: false,
    searchString: "",
    searchResults: [],
    searchSuccessful: false,
    searchCompleted: false
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

  notifyBeginSearching = (searchString) => {
    let newState = {
      bSearching: true,
      searchString: searchString,
      searchResults: [],
      searchSuccessful: false,
      searchCompleted: false
    }
    this.setState( newState );
  }

  async beginSearchFor(searchString, self) {
    let newState = {
      bSearching: false,
      searchString: searchString,
      searchResults: [],
      searchSuccessful: false,
      searchCompleted: true
    };

    let results = await self.SearchFor(searchString);
    
    if(results !== null && results.length > 0) {
      newState.searchResults = results;
      newState.searchSuccessful = true;
    }

    self.setState( newState );
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

  render() {
    
    if(this.state.searchCompleted === true && 
      this.state.searchSuccessful === true) {
        return (
          <BrowserRouter>
          <div className="App">
            <Home notifyBeginSearching = { this.notifyBeginSearching} />
            <Navigation />      
            <Photo searchResults = {this.state.searchResults} />
          </div>
          </BrowserRouter>
        );
      }
      else if(this.state.searchCompleted === true && 
        this.state.searchSuccessful === false) {          
          return (
            <BrowserRouter>
            <div className="App">
              <Home notifyBeginSearching = { this.notifyBeginSearching} />
              <Navigation />      
              <NotFound /> 
            </div>
            </BrowserRouter>
          );
      }
      else {        
        return (
          <BrowserRouter>
          <div className="App">
            <Home notifyBeginSearching = { this.notifyBeginSearching} />
            <Navigation />
          </div>
          </BrowserRouter>
        );
      }
  }
}


export default App;
