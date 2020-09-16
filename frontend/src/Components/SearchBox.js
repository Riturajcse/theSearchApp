import React from 'react';
import { Link } from 'react-router-dom';
import Lists from './Lists';
import axios from 'axios';
import getCookie from './getCookie';

import "../index.css";

const BASE_URL = 'http://localhost:8080';

export default class SearchBox extends React.Component{

  constructor() {
    super();
    this.state = {
        searchTerm: "",
        submitted: false,
        searching: false,
        items:[]
    };
  }

  handleSumbit(event) {
    event.preventDefault();
    this.setState({searching: true})
    this.setState({items: []})
    let searchParts = this.state.searchTerm.split(',');
    const name = searchParts[0];
    const location = searchParts[1] || 'redwood city, ca';
    let token = getCookie('my-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjYwOTkzODRlOTUzNzNkOWRjMmVmNGIiLCJpYXQiOjE2MDAxNjYyNDB9.-dw44t6uZ0vMhGqb-UKRFRaDeLWF2W56o_aAIjJ5prc';
    axios.post(`${BASE_URL}/api/business/search`, {token, name: name,location:location})
      .then((res) => {
        this.setState({items: res.data});
        this.setState({submitted: true});
        this.setState({searching: false});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  render(){
    return(
        <>
        <form className="example" onSubmit={(event)=>this.handleSumbit(event)}>
            <div className="formInputs">
                <input type="text" onChange={(event)=>this.handleChange(event)} placeholder="Search.." name="search" value={this.state.searchTerm}/>
                <button type="submit"><i class="fa fa-search"></i></button>
            </div>
        </form>
        {this.state.items.length === 0 && this.state.submitted && !this.state.searching ? (
            <h2>No results found!</h2>
        ) : 
        this.state.searching ? (<h2>Searching...</h2>) :
        (
            <Lists items={this.state.items}/>
        )}
        </>
    );
  };
};
