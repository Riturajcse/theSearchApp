import React from 'react';
import defaultAvarat from './default.png';
import Rating from "./Rating"
import "../index.css";

export default class UserReview extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        reviewData: props.data
    };
  }
  render(){
    return(
      <div class="container">
        <img src={this.state.reviewData.userImage || defaultAvarat} alt="Avatar" className="userImage"/>
        <p><span>{this.state.reviewData.userName}</span></p>
        <p>{this.state.reviewData.text}</p>
        <Rating rating={this.state.reviewData.rating}/>
      </div>
    );
  };
};
