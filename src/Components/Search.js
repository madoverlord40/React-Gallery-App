import React, { Component } from 'react';
import apiKey from '../config.js';
import NotFound from './NotFound'
import Axios from 'axios';
import Home from './Home';
import Photo from './Photo'

class Search extends Component
{
    //State object for keeping track of the search state
    state = {
        //are we searching?
        bSearching: false,
        //the search string
        searchString: "",
        //the search results array, which is built of an array of urls to pull images from flickr
        searchResults: [],
        //when the search completes, was it successful?
        searchSuccessful: false,
        //is the searchc completed? used in render loop for modifying what dom shows
        bSearchCompleted: false
      }
    
      //ASYNC AWAIT promise function that calls AXIOS and gathers data based on the search string
      async SearchFor(searchString) {
          let results = [];
    
          //create the url for axios to call
          const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchString}&per_page=24&format=json&nojsoncallback=1`;
    
          //wait for axios to complete
          await Axios.get(url).then(responseData => {
                //keep track of the index for inserting url results into the results array by index
                let index = 0;

                //for each loop on the array of photos returned from axios, build the array of urls so we can display the images
                responseData.data.photos.photo.forEach(element => {
                    results[index] = `https://live.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
                    index++;
              });
            }).catch(error => {
              console.log('Error fetching and parsing data', error);
            });

          return results;
      }
    
      //The main search function that starts the async await process and sets the new state for the component
    beginSearchFor = async (searchString) => {
        //create a new state
        let newState = {
          bSearching: true,
          searchString: searchString,
          searchResults: [],
          searchSuccessful: false,
          bSearchCompleted: false
        };
    
        //wait for the results
        let results = await this.SearchFor(searchString);
        
        //finish updating the state with the result
        newState.searchSuccessful = (results !== null && results.length > 0) ;
        newState.searchResults = results;
        newState.bSearchCompleted = true;

        //when we pass then into the libary, it will update the state, so in the render loop we can react to the change
        this.setState( newState );
    }
    
    //react function to handle component updates
    componentDidUpdate(prevProps, prevState) {
        //check to see if the topic has changed, if so start a search, if not, dont change anything
        if(this.props.match.params.topic !== this.state.searchString) {
            let searchString = this.props.match.params.topic;
            if (searchString !== null) {
                this.beginSearchFor(searchString);
            }
        }
    }

    //when this component first mounts, as in we routed to this component from home, begin the search
    componentDidMount() {
        let searchString = this.props.match.params.topic;
        if (searchString !== null) {
            this.beginSearchFor(searchString);
        }
    }
     
    render() {
        //if we are searching, display results and update the user, but only after the search is completed
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