import React, { useState } from 'react';
import axios from 'axios';
import {useHistory, useLocation, Link} from 'react-router-dom';

export const SignUpPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  let url = props.baseUrl + '/api/users';
  let location = useLocation();
  let history = useHistory();
  let {from} = location.state || { from: { pathname: "/" } };

  function handleSubmit(event){
    event.preventDefault();
    axios.post(url, {name, email, password})
      .then((res) => {
        history.push(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleOnChange(event) {
    if (event.target.name === 'name'){
        setName(event.target.value);
    };
    if (event.target.name === 'email'){
      setEmail(event.target.value);
    };
    if (event.target.name === 'password'){
      setPassword(event.target.value);
    };
  };

    return(
    <form onSubmit={handleSubmit}>
      <div className="box">
        <h1>Sign Up</h1>
        <input onChange={handleOnChange} type="text" name="name" className="email" placeholder="freddie mercury" size="35" value={name}/>
        <input onChange={handleOnChange} type="email" name="email" className="email" placeholder="freddie.mercury@gmail.com" size="35" value={email}/>
        <input onChange={handleOnChange} type="password" name="password" className="email" placeholder="queen_rox" size="35" value={password}/>
        <input class="btn" type='submit' value='Register'/>
        <div id="btn2"><Link to="/login">Sign In</Link></div> 
      </div> 
    </form> 
    );
};
