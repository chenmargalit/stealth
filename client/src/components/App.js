import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// we are connecting the App component to redux so we can call action creators from here
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import SurveyNew from './surveys/SurveyNew';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='container'>
        {/* Browser router can only take one child, so we need to div it */}
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route path='/surveys/new' component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// two arguments for connect: 1. mapStateToProps, 2. All the actions we want to connect
// here we wont use the mapStateToProps, so we define it as null
// the actions we have will now be accessed through this.props.actionName
export default connect(
  null,
  actions
)(App);
