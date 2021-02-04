import React, { Component } from 'react';
import '../css/index.css';

class Photo extends Component {    

  render() {
      return (
      <div className="photo-container">
        <h2> Results for {this.props.searchedFor} </h2>
        <ul>
          { this.props.searchResults.map((result, index) => { 
              return (
                <li key={index} className="photo-container">
                    <img src={result} alt="" />
                </li>
              );
            })
          }
        </ul>
      </div>
      );
    }
}

export default Photo;