import React, {Component} from 'react'
import moment from 'moment';
import _ from 'lodash';
import {withRouter} from 'react-router-dom'

import '../styles/favorite.style.client.css'
import '../styles/score.style.client.css'

import GameService from "../services/GameService";
import TeamService from '../services/TeamService'

class GameDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: this.props.id,
            game: {}
        };
    }

    componentDidMount() {
        GameService.getGameDetails(this.state.gameId)
            .then(game => this.setState({game}));
    }

    GameSummary = ({game}) => {
        return (
            <div className="card-text">
                <div className="row justify-content-center align-items-center">
                    <span className="game-details-text">{moment(game.scheduled).format("ddd, MM/DD/YY")}</span>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-5 row game-venue"
                         onClick={() => this.props.history.push('/details?filter=teams&id=' + game.home.id)}>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img alt="home"
                                                                                  src={TeamService.getTeamLogo(game.home.market + ' ' + game.home.name)}
                                                                                  width={"50px"}/></div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 game-heading">
                            <span>{game.home.market + ' ' + game.home.name}</span></div>
                    </div>
                    <div className="col-lg-1 col-md-1 d-none d-md-block game-heading">
                        <span>{game.home.points ? game.home.points : "--"}</span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center"><span>VS</span></div>
                    <div className="col-lg-1 col-md-1 d-none d-md-block game-heading ">
                        <span>{game.away.points ? game.away.points : "--"}</span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-5 row game-venue"
                         onClick={() => this.props.history.push('/details?filter=teams&id=' + game.away.id)}>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 game-heading">
                            <span>{game.away.market + ' ' + game.away.name}</span></div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4"><img alt="away"
                                                                                  src={TeamService.getTeamLogo(game.away.market + ' ' + game.away.name)}
                                                                                  width={"50px"}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    VenueDeets = ({venue, attendance}) => {
        return (
            <div className="card-text game-venue"
                 onClick={() => this.props.history.push('/details?filter=venues&id=' + venue.id)}>
                <div className="row justify-content-center align-items-center">
                    {venue.name} , {venue.city}, {venue.state}
                </div>
                <div className="row justify-content-center align-items-center">
                    <span className="match-details">
                        This venue holds {venue.capacity} people and had an attendance of {attendance} for this game.
          </span>
                </div>
            </div>
        )
    }

    GameScores = ({team}) => {
        return (
            <div className="card-text">
                <div className="justify-content-center align-items-center scrollable-score">
                    <div className="game-detail-heading">Passing</div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 game-details-text">No.</div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 game-details-text">Player</div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 game-details-text">C/Att</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Yds</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">TD</div>
                        <div className="col-lg-1 d-none d-lg-block game-details-text">Int</div>
                    </div>
                    {team.passing.players && team.passing.players.length > 0 ? team.passing.players.map((item, key) => {
                        return (<this.ScoreRow
                            key={key}
                            jersey={item.jersey}
                            name={item.name}
                            v1={item.completions + '/' + item.attempts}
                            v2={item.yards}
                            v3={item.touchdowns}
                            v4={item.interceptions}
                        />)
                    }) : <hr/>}
                </div>
                <hr/>
                <div className="justify-content-center align-items-center scrollable-score">
                    <div className="game-detail-heading">Rushing</div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 game-details-text">No.</div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 game-details-text">Player</div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 game-details-text">Car</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Yds</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Avg</div>
                        <div className="col-lg-1 d-none d-lg-block game-details-text">TD</div>
                    </div>
                    {team.rushing.players && team.rushing.players.length > 0 ? team.rushing.players.map((item, key) => {
                        return (<this.ScoreRow
                            key={key}
                            jersey={item.jersey}
                            name={item.name}
                            v1={item.attempts}
                            v2={item.yards}
                            v3={item.avg_yards}
                            v4={item.touchdowns}
                        />)
                    }) : <hr/>}
                </div>
                <hr/>
                <div className="justify-content-center align-items-center scrollable-score">
                    <div className="game-detail-heading">Receiving</div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 game-details-text">No.</div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 game-details-text">Player</div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 game-details-text">Rec</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Yds</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Avg</div>
                        <div className="col-lg-1 d-none d-lg-block game-details-text">TD</div>
                    </div>
                    {team.receiving.players && team.receiving.players.length > 0 ? team.receiving.players.map((item, key) => {
                        return (<this.ScoreRow
                            key={key}
                            jersey={item.jersey}
                            name={item.name}
                            v1={item.receptions}
                            v2={item.yards}
                            v3={item.avg_yards}
                            v4={item.touchdowns}
                        />)
                    }) : <hr/>}
                </div>
                <hr/>
                <div className="justify-content-center align-items-center scrollable-score">
                    <div className="game-detail-heading">Defense</div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 game-details-text">No.</div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 game-details-text">Player</div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 game-details-text">Tck</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Ast</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Sack</div>
                        <div className="col-lg-1 d-none d-lg-block game-details-text">Int</div>
                    </div>
                    {team.defense.players && team.defense.players.length > 0 ? team.defense.players.map((item, key) => {
                        return (<this.ScoreRow
                            key={key}
                            jersey={item.jersey}
                            name={item.name}
                            v1={item.tackles}
                            v2={item.assists}
                            v3={item.sacks}
                            v4={item.interceptions}
                        />)
                    }) : <hr/>}
                </div>
                <hr/>
                <div className="justify-content-center align-items-center scrollable-score">
                    <div className="game-detail-heading">Kick Returns</div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 game-details-text">No.</div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 game-details-text">Player</div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 game-details-text">Ret</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Yds</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Avg</div>
                        <div className="col-lg-1 d-none d-lg-block game-details-text">TD</div>
                    </div>
                    {team.kick_returns.players && team.kick_returns.players.length > 0 ? team.kick_returns.players.map((item, key) => {
                        return (<this.ScoreRow
                            key={key}
                            jersey={item.jersey}
                            name={item.name}
                            v1={item.number}
                            v2={item.yards}
                            v3={item.avg_yards}
                            v4={item.touchdowns}
                        />)
                    }) : <hr/>}
                </div>
                <hr/>
                <div className="justify-content-center align-items-center scrollable-score">
                    <div className="game-detail-heading">Punt Returns</div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 game-details-text">No.</div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 game-details-text">Player</div>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 game-details-text">Ret</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Yds</div>
                        <div className="col-lg-2 d-none d-lg-block game-details-text">Avg</div>
                        <div className="col-lg-1 d-none d-lg-block game-details-text">TD</div>
                    </div>
                    {team.punt_returns.players && team.punt_returns.players.length > 0 ? team.punt_returns.players.map((item, key) => {
                        return (<this.ScoreRow
                            key={key}
                            jersey={item.jersey}
                            name={item.name}
                            v1={item.number}
                            v2={item.yards}
                            v3={item.avg_yards}
                            v4={item.touchdowns}
                        />)
                    }) : <hr/>}
                </div>
            </div>
        )
    }

    ScoreRow = ({jersey, name, v1, v2, v3, v4}) => {
        return (
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 game-details-text">{jersey}</div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 game-details-text">{name}</div>
                <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 game-details-text">{v1}</div>
                <div className="col-lg-2 d-none d-lg-block game-details-text">{v2}</div>
                <div className="col-lg-2 d-none d-lg-block game-details-text">{v3}</div>
                <div className="col-lg-1 d-none d-lg-block game-details-text">{v4}</div>
            </div>
        )
    }

    GameDeets = ({game}) => {
        return (
            <div className="card-text">
                <div className="container-fluid score-box">
                    <div className="row">
                        <div className="col-md-6 justify-content-center">
                            <div className="card dash-card">
                                <div className="card-header text-center heading-text">
                                    {_.upperCase(game.away.name)}
                                </div>
                                <div className="card-body">
                                    <this.GameScores team={game.away}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 justify-content-center">
                            <div className="card dash-card">
                                <div className="card-header text-center heading-text">
                                    {_.upperCase(game.home.name)}
                                </div>
                                <div className="card-body">
                                    <this.GameScores team={game.home}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav nav-tabs nav-fills">
                    <div className="nav-item"></div>
                    <div className="nav-item"></div>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div>
                <div className="container-fluid fav-box">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header text-center heading-text">
                                    Game Details
                                </div>
                                <div className="card-body">
                                    {!_.isEmpty(this.state.game) && <this.GameSummary game={this.state.game.summary}/>}
                                    <hr/>
                                    {!_.isEmpty(this.state.game) &&
                                    <this.VenueDeets venue={this.state.game.summary.venue}
                                                     attendance={this.state.game.attendance}/>}
                                    <hr/>
                                    {!_.isEmpty(this.state.game) && !_.isEmpty(this.state.game.statistics) &&
                                    <this.GameDeets game={this.state.game.statistics}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(GameDetails);