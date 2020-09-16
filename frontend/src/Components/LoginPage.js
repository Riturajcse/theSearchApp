import React, { useState } from 'react';
import axios from 'axios';
import {useHistory, useLocation, Link} from 'react-router-dom';

export const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let url = props.baseUrl + '/api/auth';
  let location = useLocation();
  let history = useHistory();
  let {from} = location.state || { from: { pathname: "/" } };

// Create a cookie with the JWT
  function handleSubmit(event){
    event.preventDefault();
    axios.post(url, {email, password})
      .then((res) => {
        document.cookie = 'my-token='+res.data+'; max-age=60;';
        history.push(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleOnChange(event){
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
        <h1>Login</h1>
        <input onChange={handleOnChange} type="email" name="email" className="email" placeholder="freddie.mercury@gmail.com" size="35" value={email}/>
        <input onChange={handleOnChange} type="password" name="password" className="email" placeholder="queen_rox" size="35" value={password}/>
        <input class="btn" type='submit' value='Sign In'/>
        <div id="btn2"><Link to="/signup"><span className="noDecoration">Sign Up</span></Link></div>
      </div> 
    </form> 
    );
};
