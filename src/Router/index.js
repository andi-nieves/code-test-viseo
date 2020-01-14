import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { get } from 'lodash';

import Login from '../Pages/Login';
import Details from '../Pages/Details';
import List from '../Pages/List';

function App({ auth, ...r }) {
  const authenticated = () => {
    if(window.location.pathname === '/login') {
      window.location = '/'
    }
    return (
      <Switch>
        <Route exact path="/" component={Details} />
        <Route exact path="/list" component={List} />
        <Route path="/details" component={Details} />
      </Switch>
    )
  }
  const unauthenticated = () => {
    if(window.location.pathname !== '/login') {
      window.location = '/login'
    }
    return (
      <Switch>
        <Route  exact path="/login" component={Login}/>
      </Switch>
    )
  }
  const renderRoute = () => get(auth, 'data.username', null) ? authenticated() : unauthenticated()

  return (
    <div className="App container">
      <Router>
        {renderRoute()}
      </Router>
    </div>
  );
}
const mapState = state => {
  return {
    auth: state.Auth
  }
}
export default connect(mapState)(App);