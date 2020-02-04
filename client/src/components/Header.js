import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'still deciding';
      case false:
        return (
          <div>
            <li>
              <a href='/auth/google'>Log in with Google</a>
            </li>
            <li>
              <a href='/face'>Login with FB</a>
            </li>
          </div>
        );
      default:
        return [
          <li key='1'>
            <Payments />
          </li>,
          <li key='2' style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key='3'>
            <a href='/api/logout'>Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
            style={{ paddingLeft: 15 }}
          >
            Emaily
          </Link>
          <ul className='right' style={{ paddingRight: 15 }}>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  // authReducer is defined as auth in the reducer file
  return { auth };
}

export default connect(mapStateToProps)(Header);
