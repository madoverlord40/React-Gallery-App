import React, { Component } from 'react';
import '../css/index.css';

class Photo extends Component {    

    render() {
        return (
        <div className="photo-container">
          <h2>Results</h2>
          <ul>
            { this.props.searchResults.map(result => { 
                return (
                  <li className="photo-container">
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