import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LoginPage } from './Components/LoginPage';
import PrivateRoute from './Components/PrivateRoute';
import { SignUpPage } from './Components/SignUpPage';
import SearchBox from './Components/SearchBox';

import "./index.css";

const BASE_URL = 'http://localhost:8080';

ReactDOM.render(
  <BrowserRouter>
    <div>
    <ul className="header">
        <li><Link to="/">The Search App</Link></li>
     </ul>
      <Switch>
        <Route path='/login'>
            <LoginPage baseUrl={BASE_URL}/>
        </Route>
        <Route path='/signup'>
            <SignUpPage baseUrl={BASE_URL}/>
        </Route>
        <PrivateRoute path='/'>
          <SearchBox/>
        </PrivateRoute>
      </Switch>
    </div>
  </BrowserRouter>, document.getElementById('root')
);
