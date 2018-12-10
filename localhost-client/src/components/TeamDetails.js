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
        <br />
        {team.coaches && team.coaches.length > 0 && <this.CoachDeets coaches={team.coaches} />}
      </div>
    )
  };

  PlayerDeets = ({ players }) => {
    return (
      <div className="card-text text-center">
        <h5 className="text-left">Players</h5>
        <table className="card-text table table-borderless">
          <thead>
            <tr className="d-flex table-row-items">
              <th className="col-1 match-details"><strong>No.</strong></th>
              <th className="col-4 match-details"><strong>Name</strong></th>
              <th className="col-1 match-details"><strong>Birthdate</strong></th>
              <th className="col-1 match-details"><strong>Position</strong></th>
              <th className="col-2 match-details"><strong>College Conference</strong></th>
              <th className="col-1 match-details"><strong>Rookie Year</strong></th>
              <th className="col-1 match-details"><strong>Height</strong></th>
              <th className="col-1 match-details"><strong>Weight</strong></th>
            </tr>
          </thead>
          <tbody>
            {players.map((item, key) => {
              return (<this.PlayersRow
                id={item.id}
                key={key}
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
          </tbody>
        </table>
      </div >
    )
  }

  PlayersRow = ({ key, jersey, name, v1, v2, v3, v4, v5, v6, id }) => {
    return (
      <tr key={key} onClick={() => this.props.history.push('/details?filter=players&id=' + id)}
        className="d-flex table-row-items table-body-item">
        <td className="col-1 match-details">{jersey}</td>
        <td className="col-4 match-details">{name}</td>
        <td className="col-1 match-details">{v1}</td>
        <td className="col-1 match-details">{v2}</td>
        <td className="col-2 match-details">{v3}</td>
        <td className="col-1 match-details">{v4}</td>
        <td className="col-1 match-details">{v5} inches</td>
        <td className="col-1 match-details">{v6} pounds</td>
      </tr>
    )
  }

  CoachDeets = ({ coaches }) => {
    return (
      <div className="card-text text-center">
        <h5 className="text-left">Coaches</h5>
        <table className="card-text table table-borderless">
          <thead>
            <tr className="d-flex table-row-items">
              <th className="col-6 match-details"><strong>Name</strong></th>
              <th className="col-6 match-details"><strong>Position</strong></th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((item, key) => {
              return (<tr key={key} className="d-flex table-row-items table-body-item">
                <td className="col-6 match-details">{item.full_name}</td>
                <td className="col-6 match-details">{item.position}</td>
              </tr>)
            })}
          </tbody>
        </table>
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