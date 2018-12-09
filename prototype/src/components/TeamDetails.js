import React, { Component } from 'react'
import _ from 'lodash';

import '../styles/favorite.style.client.css'

import { withRouter } from 'react-router-dom'
import TeamService from "../services/TeamService";

class TeamDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamId: this.props.id,
      team: {}
    };
  }

  componentDidMount() {
    TeamService.getTeamDetails(this.state.teamId)
      .then(team => this.setState({ team }));
  }

  TeamDeets = ({ team }) => {
    return (
      <div className="card-body">
        <hr />
        {team.players && team.players.length > 0 && <this.PlayerDeets players={team.players} />}
        <hr />
        {team.coaches && team.coaches.length > 0 && <this.CoachDeets coaches={team.coaches} />}
      </div>
    )
  };

  PlayerDeets = ({ players }) => {
    return (
      <div className="card-text">
        <h5 className="text-left">Players</h5>
        <div className="row">
          <div className="col-1 match-details"><strong>No.</strong></div>
          <div className="col-4 match-details"><strong>Name</strong></div>
          <div className="col-1 match-details"><strong>Birthdate</strong></div>
          <div className="col-1 match-details"><strong>Position</strong></div>
          <div className="col-2 match-details"><strong>College Conference</strong></div>
          <div className="col-1 match-details"><strong>Rookie Year</strong></div>
          <div className="col-1 match-details"><strong>Height</strong></div>
          <div className="col-1 match-details"><strong>Weight</strong></div>
        </div>
        {players.map((item, key) => {
          return (<this.PlayersRow
            jersey={item.jersey}
            name={item.name}
            v1={item.birth_date}
            v2={item.position}
            v3={item.college_conf}
            v4={item.rookie_year}
            v5={item.height}
            v6={item.weight}
          />)
        })}
      </div >
    )
  }

  PlayersRow = ({ jersey, name, v1, v2, v3, v4, v5, v6 }) => {
    return (
      <div className="row">
        <div className="col-1 match-details">{jersey}</div>
        <div className="col-4 match-details">{name}</div>
        <div className="col-1 match-details">{v1}</div>
        <div className="col-1 match-details">{v2}</div>
        <div className="col-2 match-details">{v3}</div>
        <div className="col-1 match-details">{v4}</div>
        <div className="col-1 match-details">{v5} inches</div>
        <div className="col-1 match-details">{v6} pounds</div>
      </div>
    )
  }

  CoachDeets = ({ coaches }) => {
    return (
      <div className="card-text text-center">
        <h5 className="text-left">Coaches</h5>
        <div className="row">
          <div className="col-6 match-details"><strong>Name</strong></div>
          <div className="col-6 match-details"><strong>Position</strong></div>
        </div>
        {coaches.map((item) => {
          return (<div className="row">
            <div className="col-6 match-details">{item.full_name}</div>
            <div className="col-6 match-details">{item.position}</div>
          </div>)
        })}
      </div>
    )
  }

  render() {
    console.log(this.state.team);
    return (
      <div>
        <div className="container-fluid fav-box">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header text-center heading-text">
                  Team Details
                </div>
                <div className="card-header text-center">
                  <img alt="logo" src={TeamService.getTeamLogo(this.state.team.market + ' ' + this.state.team.name)}
                    className="fav-img" width={"120px"} />
                </div>
                <div className="card-title text-center">
                  <h3>{this.state.team.market} {this.state.team.name}</h3>
                </div>
                <div className="card-subtitle text-center">
                  {this.state.team.division && <h6>{this.state.team.division.name}</h6>}
                </div>
                {!_.isEmpty(this.state.team) && <this.TeamDeets team={this.state.team} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(TeamDetails);