import React, { Component } from 'react'
import moment from 'moment';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'

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
      .then(game => this.setState({ game }));
  }

  GameSummary = ({ game }) => {
    return (
      <div className="card-text">
        <div className="row justify-content-center align-items-center">
          <span className="match-details">{moment(game.scheduled).format("ddd, MM/DD/YY")}</span>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-1"><img alt="home" src={TeamService.getTeamLogo(game.home.market + ' ' + game.home.name)} width={"50px"} /></div>
          <div className="col-md-3 match-text"><span>{game.home.market + ' ' + game.home.name}</span></div>
          <div className="col-md-1 match-text"><span>{game.home.points ? game.home.points : "--"}</span>
          </div>
          <div className="col-md-1 text-center"><span>VS</span></div>
          <div className="col-md-1 match-text "><span>{game.away.points ? game.away.points : "--"}</span>
          </div>
          <div className="col-md-3 match-text"><span>{game.away.market + ' ' + game.away.name}</span></div>
          <div className="col-md-1"><img alt="away" src={TeamService.getTeamLogo(game.away.market + ' ' + game.away.name)} width={"50px"} />
          </div>
        </div>
      </div>
    )
  };

  VenueDeets = ({ game, attendance }) => {
    return (
      <div className="card-text">
        <div className="row justify-content-center align-items-center">
          {game.venue.name} , {game.venue.city}, {game.venue.state}
        </div>
        <div className="row justify-content-center align-items-center">
          <span className="match-details">
            This venue holds {game.venue.capacity} people and had an attendance of {attendance} for this game.
          </span>
        </div>
      </div>
    )
  }

  GameScores = ({ team }) => {
    return (
      <div className="card-text">
        <div className="justify-content-center align-items-center scrollable-score">
          <div>Passing</div>
          <div className="row">
            <div className="col-1 match-details">No.</div>
            <div className="col-3 match-details">Player</div>
            <div className="col-2 match-details">Comp/Att</div>
            <div className="col-2 match-details">Yards</div>
            <div className="col-2 match-details">Touchdowns</div>
            <div className="col-2 match-details">Interceptions</div>
          </div>
          {team.passing.players && team.passing.players.length > 0 ? team.passing.players.map((item, key) => {
            return (<this.ScoreRow
              jersey={item.jersey}
              name={item.name}
              v1={item.completions + '/' + item.attempts}
              v2={item.yards}
              v3={item.touchdowns}
              v4={item.interceptions}
            />)
          }) : <hr />}
        </div>
        <hr />
        <div className="justify-content-center align-items-center scrollable-score">
          <div>Rushing</div>
          <div className="row">
            <div className="col-1 match-details">No.</div>
            <div className="col-3 match-details">Player</div>
            <div className="col-2 match-details">Attempts</div>
            <div className="col-2 match-details">Yards</div>
            <div className="col-2 match-details">Average</div>
            <div className="col-2 match-details">Touchdowns</div>
          </div>
          {team.rushing.players && team.rushing.players.length > 0 ? team.rushing.players.map((item, key) => {
            return (<this.ScoreRow
              jersey={item.jersey}
              name={item.name}
              v1={item.attempts}
              v2={item.yards}
              v3={item.avg_yards}
              v4={item.touchdowns}
            />)
          }) : <hr />}
        </div>
        <hr />
        <div className="justify-content-center align-items-center scrollable-score">
          <div>Receiving</div>
          <div className="row">
            <div className="col-1 match-details">No.</div>
            <div className="col-3 match-details">Player</div>
            <div className="col-2 match-details">Receptions</div>
            <div className="col-2 match-details">Yards</div>
            <div className="col-2 match-details">Average</div>
            <div className="col-2 match-details">Touchdowns</div>
          </div>
          {team.receiving.players && team.receiving.players.length > 0 ? team.receiving.players.map((item, key) => {
            return (<this.ScoreRow
              jersey={item.jersey}
              name={item.name}
              v1={item.receptions}
              v2={item.yards}
              v3={item.avg_yards}
              v4={item.touchdowns}
            />)
          }) : <hr />}
        </div>
        <hr />
        <div className="justify-content-center align-items-center scrollable-score">
          <div>Defense</div>
          <div className="row">
            <div className="col-1 match-details">No.</div>
            <div className="col-3 match-details">Player</div>
            <div className="col-2 match-details">Tackles</div>
            <div className="col-2 match-details">Assists</div>
            <div className="col-2 match-details">Sacks</div>
            <div className="col-2 match-details">Interceptions</div>
          </div>
          {team.defense.players && team.defense.players.length > 0 ? team.defense.players.map((item, key) => {
            return (<this.ScoreRow
              jersey={item.jersey}
              name={item.name}
              v1={item.tackles}
              v2={item.assists}
              v3={item.sacks}
              v4={item.interceptions}
            />)
          }) : <hr />}
        </div>
        <hr />
        <div className="justify-content-center align-items-center scrollable-score">
          <div>Kick Returns</div>
          <div className="row">
            <div className="col-1 match-details">No.</div>
            <div className="col-3 match-details">Player</div>
            <div className="col-2 match-details">Returns</div>
            <div className="col-2 match-details">Yards</div>
            <div className="col-2 match-details">Average</div>
            <div className="col-2 match-details">Touchdowns</div>
          </div>
          {team.kick_returns.players && team.kick_returns.players.length > 0 ? team.kick_returns.players.map((item, key) => {
            return (<this.ScoreRow
              jersey={item.jersey}
              name={item.name}
              v1={item.number}
              v2={item.yards}
              v3={item.avg_yards}
              v4={item.touchdowns}
            />)
          }) : <hr />}
        </div>
        <hr />
        <div className="justify-content-center align-items-center scrollable-score">
          <div>Punt Returns</div>
          <div className="row">
            <div className="col-1 match-details">No.</div>
            <div className="col-3 match-details">Player</div>
            <div className="col-2 match-details">Returns</div>
            <div className="col-2 match-details">Yards</div>
            <div className="col-2 match-details">Average</div>
            <div className="col-2 match-details">Touchdowns</div>
          </div>
          {team.punt_returns.players && team.punt_returns.players.length > 0 ? team.punt_returns.players.map((item, key) => {
            return (<this.ScoreRow
              jersey={item.jersey}
              name={item.name}
              v1={item.number}
              v2={item.yards}
              v3={item.avg_yards}
              v4={item.touchdowns}
            />)
          }) : <hr />}
        </div>
      </div>
    )
  }

  ScoreRow = ({ jersey, name, v1, v2, v3, v4 }) => {
    return (
      <div className="row">
        <div className="col-1 match-details">{jersey}</div>
        <div className="col-3 match-details">{name}</div>
        <div className="col-2 match-details">{v1}</div>
        <div className="col-2 match-details">{v2}</div>
        <div className="col-2 match-details">{v3}</div>
        <div className="col-2 match-details">{v4}</div>
      </div>
    )
  }

  GameDeets = ({ game }) => {
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
                  <this.GameScores team={game.away} />
                </div>
              </div>
            </div>
            <div className="col-md-6 justify-content-center">
              <div className="card dash-card">
                <div className="card-header text-center heading-text">
                  {_.upperCase(game.home.name)}
                </div>
                <div className="card-body">
                  <this.GameScores team={game.home} />
                </div>
              </div>
            </div>
          </div>
        </div><div className="nav nav-tabs nav-fills">
          <div className="nav-item"></div>
          <div className="nav-item"></div>
        </div>
      </div >
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
                  {!_.isEmpty(this.state.game) && <this.GameSummary game={this.state.game.summary} />}
                  <hr />
                  {!_.isEmpty(this.state.game) && <this.VenueDeets game={this.state.game.summary} attendance={this.state.game.attendance} />}
                  <hr />
                  {!_.isEmpty(this.state.game) && <this.GameDeets game={this.state.game.statistics} />}
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