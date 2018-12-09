import React, { Component } from 'react'
import TeamService from "../services/TeamService";
import '../styles/schedule.style.client.css'
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';

class ScheduleBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {}
        };
    }

    componentDidMount() {
        TeamService.getSchedule()
            .then(schedule => this.setState({
                schedule: schedule
            }))
    }

    ListItemComponent = ({ game }) => {
        return (
            <li onClick={() => this.props.history.push('/details?filter=game&id=' + game.id)}
                className="list-group-item schedule-card">
                <div className="row justify-content-center align-items-center">
                    <span className="match-details">{moment(game.scheduled).format("ddd, MM/D")}</span>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-1"><img src={TeamService.getTeamLogo(game.home.name)} width={"50px"} /></div>
                    <div className="col-md-3 match-text"><span>{game.home.name}</span></div>
                    <div className="col-md-1 match-text"><span>{game.scoring ? game.scoring.home_points : "--"}</span>
                    </div>
                    <div className="col-md-1 text-center"><span>VS</span></div>
                    <div className="col-md-1 match-text "><span>{game.scoring ? game.scoring.away_points : "--"}</span>
                    </div>
                    <div className="col-md-3 match-text"><span>{game.away.name}</span></div>
                    <div className="col-md-1"><img src={TeamService.getTeamLogo(game.away.name)} width={"50px"} /></div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <span
                        className="match-details">Venue: {game.venue.name} , {game.venue.city}, {game.venue.state}</span>
                </div>
            </li>
        )
    };

    render() {
        return (
            <div className="text-center">
                <ul className="list-group">
                    {
                        this.state.schedule && this.state.schedule.games
                        && this.state.schedule.games.length > 0 && this.state.schedule.games.map((game, index) =>
                            <this.ListItemComponent key={index} game={game} />)
                    }
                </ul>
            </div>
        );
    }
}

export default withRouter(ScheduleBox);

