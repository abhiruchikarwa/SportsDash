import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TeamRow from '../components/TeamRow';
import TeamService from '../services/TeamService'
import TeamDetail from './TeamDetail';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            displayTeams: [],
            searchTerm: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        this.setState({
            searchTerm: event.target.value,
            displayTeams: this.state.teams.filter(team => team.market.toLowerCase().includes(event.target.value.toLowerCase())
                || team.name.toLowerCase().includes(event.target.value.toLowerCase())).splice(0)
        });
    }

    componentDidMount() {
        TeamService.getTeams()
            .then(teams => this.setState({
                teams: teams,
                displayTeams: teams,
            }));
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" render={() =>
                        <div className="container-fluid">
                            <h1>Dashboard</h1>
                            <form>
                                <div className="container row">
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Enter team name here"
                                           onChange={this.handleSearch}/>
                                </div>
                            </form>
                            <TeamRow
                                teams={this.state.displayTeams}
                            />
                        </div>
                    }/>
                    <Route
                        render={(props) =>
                            <TeamDetail
                                {...props}/>}
                        path="/team/:teamId"/>
                </div>
            </Router>
        );
    }
}