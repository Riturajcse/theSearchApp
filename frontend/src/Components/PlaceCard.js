import React from 'react';
import { Link } from 'react-router-dom';

import "../index.css";
import Rating from './Rating';
import Review from './Review';


export default class PlaceCard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        data: props.data
    };
  }
  render(){
    return(
        <div class="card">
          <img src={this.state.data.image} alt="image"/>
          <div class="cardContainer">
            <h4><b>{this.state.data.name}</b></h4> 
            <p>{this.state.data.address}</p> 
            <Rating rating={this.state.data.rating}/>
            <Review count={this.state.data.reviews} name={this.state.data.name} id={this.state.data.id}/>
            {/* <ReviewModal name={this.state.data.name} id={this.state.data.id}/> */}
          </div>
        </div>
    );
  };
};
