import React, { Component } from 'react'
import TeamService from "../services/TeamService";
import '../styles/schedule.style.client.css'
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';
import ScheduleService from "../services/ScheduleService";
import StandingService from "../services/StandingService";

class ScheduleBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {}
        };
    }

    componentDidMount() {
        setTimeout(() => {
            return ScheduleService.getSchedule(StandingService.weekNumber)
                .then(schedule => this.setState({
                    schedule: schedule
                }))
        }, 2000);
    }

    ListItemComponent = ({ game }) => {
        return (
            <li onClick={() => this.props.history.push('/details?filter=games&id=' + game.id)}
                className="list-group-item schedule-card">
                <div className="row justify-content-center align-items-center">
                    <span className="match-details">{moment(game.scheduled).format("ddd, MM/D")}</span>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-5 row game-venue" onClick={() => this.props.history.push('/details?filter=teams&id=' + game.home.id)}>
                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-2"><img alt="home"
                            src={TeamService.getTeamLogo(game.home.name)}
                            width={"50px"} /></div>
                        <div className="col-lg-8 col-md-8 col-sm-1    0 col-xs-10 match-text"><span>{game.home.name}</span></div>
                    </div>
                    <div className="col-lg-1 col-md-1 d-none d-md-block match-text"><span>{game.scoring ? game.scoring.home_points : "--"}</span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center"><span>VS</span></div>
                    <div className="col-lg-1 col-md-1 d-none d-md-block match-text "><span>{game.scoring ? game.scoring.away_points : "--"}</span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-5 row game-venue" onClick={() => this.props.history.push('/details?filter=teams&id=' + game.away.id)}>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10 match-text"><span>{game.away.name}</span></div>
                        <div className="col-lg-4 col-md-4 col-sm-2 col-xs-2"><img alt="away"
                            src={TeamService.getTeamLogo(game.away.name)}
                            width={"50px"} />
                        </div>
                    </div>
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

