import React from 'react';
import axios from 'axios';
import getCookie from './getCookie';
import { Overlay } from 'react-portal-overlay';
import UserReview from './UserReview';

const BASE_URL = 'http://localhost:8080';

export default class Review extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      businessId: props.id,
      businessName: props.name,
      review_count: props.count,
      reviews: []
    };
  };

  updateState = () => {
    let token = getCookie('my-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjYwOTkzODRlOTUzNzNkOWRjMmVmNGIiLCJpYXQiOjE2MDAxNjYyNDB9.-dw44t6uZ0vMhGqb-UKRFRaDeLWF2W56o_aAIjJ5prc';
    axios.post(`${BASE_URL}/api/business/reviews`, {token, id: this.state.businessId})
      .then((res) => {
        this.setState({reviews: res.data});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setOpen(value) {
    this.updateState();
    this.setState({open: value});
  }

  render(){
    return(
        <>
        <button onClick={() => this.setOpen(true)}>Reviews</button>
        <Overlay
          open={this.state.open}
          className="overLayBox"
        >
          <div className="modalBox">
            <div className="reviewHeaderContainer">
                <span class="fa fa-times-circle-o fa-4x reviewCloseButton" onClick={() => this.setOpen(false)}></span>
            </div>
            <h1 className="reviewHeader">{this.state.businessName}</h1>
            <div className="reviewContainer">
                {this.state.reviews.map((review) => (
                    <UserReview key={review.id} data={review}/>
                ))}
            </div>
          </div>
        </Overlay>
      </>
    );
  };
};
