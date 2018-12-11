import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import '../styles/dashboard.style.client.css'
import ScheduleBox from "../components/ScheduleBox";
import StandingsBox from "../components/StandingsBox";
import SearchResults from "../components/SearchResults";
import FavoriteComponent from "../components/FavoriteComponent";
import DetailsComponent from '../components/DetailsComponent';
import Profile from "../components/Profile";
import Register from "../components/Register";
import Login from "../components/Login";
import CommentBox from "../components/CommentBox";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            displayTeams: [],
            searchTerm: '',
            favorites: {}
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <NavBar/>
                            </div>
                        </div>
                    </div>
                    <Route path="/(home|)" render={() =>
                        <div className="container search-bar">
                            <div className="row">
                                <div className="col-md-12">
                                    <SearchBar/>
                                </div>
                            </div>
                        </div>
                    }/>
                    <Route exact path="/(home|)" render={() =>
                        <div>
                            {sessionStorage.getItem('currentUser') !== null &&
                            <FavoriteComponent dashOrProf='Dash'/>}
                            <div className="container-fluid dash-box">
                                <div className="row">
                                    <div className="col-md-6 justify-content-center">
                                        <div className="card dash-card">
                                            <div className="card-header text-center heading-text">
                                                Games Schedule
                                            </div>
                                            <div className="card-body pre-scrollable">
                                                <ScheduleBox/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 justify-content-center">
                                        <div className="card dash-card">
                                            <div className="card-header text-center heading-text">
                                                Team Standings
                                            </div>
                                            <div className="card-body pre-scrollable">
                                                <StandingsBox/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }/>
                    <Route exact path="/search" component={SearchResults}/>
                    <Route exact path="/comment" component={CommentBox}/>
                    <Route exact path="/details" component={DetailsComponent}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/profile/:userId/:edit" component={Profile}/>
                    {/*<Route path="/profile/:userId" render={() => (<Redirect to="/profile/:userId/false"/>)}/>*/}
                </div>
            </Router>
        );
    }
}