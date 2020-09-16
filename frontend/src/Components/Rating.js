import React from 'react';
import { Link } from 'react-router-dom';

import "../index.css";

export default class Rating extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        rating: props.rating
    };
  }
  render(){
  let stars = [];
    let counter = 0;
    let fullStars = Math.ceil(this.state.rating);
    let halfStars = Math.abs(this.state.rating) - Math.floor(this.state.rating);
    if (halfStars > 0) {
        fullStars--;
    }
    while(counter < fullStars) {
            stars.push(<span class="fa fa-star checked"></span>);
            counter++;   
    }

    if (halfStars > 0) {
        stars.push(<span class="fa fa-star-half-full checked"></span>);
    }

    while(stars.length < 5) {
        stars.push(<span class="fa fa-star-o checked"></span>);
    }
    stars = <div>{stars}</div>
    return(stars);
  };
};
