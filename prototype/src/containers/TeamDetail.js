import React, {Component} from 'react'
import TeamService from '../services/TeamService';

export default class TeamDetail extends Component {

    constructor(props) {
        super(props);
        const team = {};
        this.state = {
            team,
            teamId: props.match.params.teamId,
        }
    }

    componentDidMount() {
        TeamService.getTeamDetails(this.state.teamId)
            .then(team => this.setState({
                team: team
            }));
    }

    render() {
        return (
            <div>
                {
                    this.state.team && this.state.team.venue && this.state.team.division && (
                        <ul>
                            <h1>Team Detail</h1>
                            <li> Name: {this.state.team.name}</li>
                            <li>Market: {this.state.team.market}</li>
                            <li>Venue Name: {this.state.team.venue.name}</li>
                            <li>Venue City: {this.state.team.venue.city}</li>
                            <li>Venue State: {this.state.team.venue.state}</li>
                            <li>Division Name: {this.state.team.division.name}</li>
                            <li>Conference
                                Name: {this.state.team.conference ? this.state.team.conference.name : ""}</li>
                            <li>Coaches Count: {this.state.team.coaches ? this.state.team.coaches.length : 0}</li>
                            <li>Player Count: {this.state.team.players ? this.state.team.players.length : 0}</li>
                        </ul>
                    )}
            </div>

        );
    }
}