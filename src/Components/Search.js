import React, { Component } from 'react';
import apiKey from '../config.js';
import NotFound from './NotFound'
import Axios from 'axios';
import Home from './Home';
import Photo from './Photo'

class Search extends Component
{
    state = {
        bSearching: false,
        searchString: "",
        searchResults: [],
        searchSuccessful: false,
        bSearchCompleted: false
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
    
    beginSearchFor = async (searchString) => {
        let newState = {
          bSearching: true,
          searchString: searchString,
          searchResults: [],
          searchSuccessful: false,
          bSearchCompleted: false
        };
    
        let results = await this.SearchFor(searchString);
        
        newState.searchSuccessful = (results !== null && results.length > 0) ;
        newState.searchResults = results;
        newState.bSearchCompleted = true;

        this.setState( newState );
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.topic !== this.state.searchString) {
            let searchString = this.props.match.params.topic;
            if (searchString !== null) {
                this.beginSearchFor(searchString);
            }
        }
    }

    componentDidMount() {
        let searchString = this.props.match.params.topic;
        if (searchString !== null) {
            this.beginSearchFor(searchString);
        }
    }
     
    render() {
        if(this.state.bSearching) {
            if(this.state.bSearchCompleted) {
                return (
                    <div className="App">
                        <Home />
                        {                    
                            (this.state.searchSuccessful) ?
                            <Photo searchedFor = {this.state.searchString} searchResults = {this.state.searchResults} />
                            :
                            <NotFound />
                        }
                    </div>
                );
            } else {
                return (
                    <div className="App">                
                       <h2>SEARCHING</h2>
                    </div>
                );
            }
        } else {
            return (
                <div className="App">                
                </div>
            );
        }
        
    }
}

export default Search;