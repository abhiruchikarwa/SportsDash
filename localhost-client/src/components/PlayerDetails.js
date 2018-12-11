import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import CommentBox from './CommentBox';
import PlayerService from '../services/PlayerService';
import '../styles/profile.style.client.css';

class PlayerDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerId: this.props.id,
      player: {},
    }
  }

  componentDidMount() {
    PlayerService.getPlayerDetails(this.state.playerId)
      .then(player => this.setState({ player }));
  }

  render() {
    return (
      <div className='profile-content'>
        <div className='profile-body'>
          <div className="row">
            <div className="profile-left col-sm-3">
              {this.state.player != null &&
                <ul className='list-group'>
                  <li className="list-group-item">{this.state.player.name}</li>
                  {this.state.player.team && <li className="list-group-item ">Team: {this.state.player.team.market + ' ' + this.state.player.team.name}</li>}
                  <li className="list-group-item">Position: {this.state.player.position}</li>
                  <li className="list-group-item">Jersey: {this.state.player.jersey}</li>
                  <li className="list-group-item">Birthdate: {this.state.player.birth_date}</li>
                  <li className="list-group-item">Birthplace: {this.state.player.birth_place}</li>
                  <li className="list-group-item">Height: {this.state.player.height} inches</li>
                  <li className="list-group-item">Weight: {this.state.player.weight} pounds</li>
                  <li className="list-group-item">Rookie Year: {this.state.player.rookie_year}</li>
                </ul>}
            </div>
            <div className="profile-right col-sm-9">
              <CommentBox />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PlayerDetails)