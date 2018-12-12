import React, { Component } from 'react'
import '../styles/nav-bar.style.client.css'
import { withRouter } from 'react-router-dom'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(sessionStorage.getItem('user')),
    };
  }

  login = () => {
    if (this.state.currentUser != null)
      this.props.history.push('/profile/' + this.state.currentUser.id);
    else
      this.props.history.push('/login');
  };

  logout = () => {
    this.setState({
      currentUser: {},
    })
    this.props.logout();
  };

  componentDidUpdate(prevProps, prevState) {
    const session = JSON.parse(sessionStorage.getItem('user'));
    if (this.props.location !== prevProps.location) {
      this.setState({
        currentUser: session,
      })
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar row fixed-top navbar-expand-lg main_nav">
          <a className="navbar-brand main_title" href="/">My Sports Dash</a>
          {
            this.state.currentUser &&
            <div className="logout-button"
              onClick={() => this.logout()}>
              <i className="fas fa-sign-out-alt fa-2x text-white" />
            </div>
          }
          <div className={this.state.currentUser ? "profile-button" : "profile-button-right"}
            onClick={() => this.login()}>
            <i className="btn fa fa-user fa-2x text-white" />
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);