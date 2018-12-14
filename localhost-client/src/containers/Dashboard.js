import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import ScheduleBox from "../components/ScheduleBox";
import StandingsBox from "../components/StandingsBox";
import SearchResults from "../components/SearchResults";
import FavoriteComponent from "../components/FavoriteComponent";
import DetailsComponent from '../components/DetailsComponent';
import Profile from "../components/Profile";
import Register from "../components/Register";
import Login from "../components/Login";
import '../styles/dashboard.style.client.css'
import UserService from "../services/UserService";


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      displayTeams: [],
      searchTerm: '',
      favorites: {},
      currentUser: JSON.parse(sessionStorage.getItem('user')),
    };
      this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

    forceUpdateHandler(){
        this.setState({
            currentUser: JSON.parse(sessionStorage.getItem('user'))
        });
    };

  logout = () => {
    UserService.logout()
      .then(() => {
        sessionStorage.clear();
        window.location = '/';
      });
  };

    render() {
    return (
      <Router>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <NavBar
                  logout={this.logout} />
              </div>
            </div>
          </div>
          <Route path="/(home|)" render={() =>
            <div className="container search-bar">
                {
                    this.state.currentUser &&
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="welcome">Welcome {this.state.currentUser.firstName}</h1>
                        </div>
                    </div>
                }
              <div className="row">
                <div className="col-md-12 text-center">
                  <SearchBar />
                    <p className="search-helper">Search for any player, team or venue here..!</p>
                </div>
              </div>
            </div>
          } />
          <Route exact path="/(home|)" render={() =>
            <div>
              {
                this.state.currentUser &&
                <FavoriteComponent />
              }
              <div className="container-fluid dash-box">
                <div className="row">
                  <div className="col-md-6 justify-content-center">
                    <div className="card dash-card">
                      <div className="card-header text-center heading-text">
                        Games Schedule </div>
                      <div className="card-body pre-scrollable">
                        <ScheduleBox />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 justify-content-center">
                    <div className="card dash-card">
                      <div className="card-header text-center heading-text">
                        Team Standings </div>
                      <div className="card-body pre-scrollable">
                        <StandingsBox />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route exact path="/search" component={SearchResults} />
          <Route exact path="/details" component={DetailsComponent} />
          <Route exact path="/login" render={() => <Login forceUpdate={this.forceUpdateHandler}/>}/>
          <Route exact path="/register" render={() => <Register forceUpdate={this.forceUpdateHandler}/>}/>
          <Route exact path="/profile/:userId" component={Profile} />
        </div>
      </Router>
    );
  }
}