import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import CommentBoxForPlayer from './CommentBoxForPlayer';
import PlayerService from '../services/PlayerService';
import '../styles/profile.style.client.css';
import UserService from "../services/UserService";
import _ from "lodash";
import player_img from "../resources/images/player_image/american_football.png"

class PlayerDetails extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.state = {
      playerId: this.props.id,
      player: {},
      currentPlayer: {},
      currentUser: user,
      userFollowing: []
    }
  }

  componentDidMount() {
    let currentPlayer;
    let userFollowing;

    PlayerService.getPlayerByApiId(this.state.playerId)
      .then(player => currentPlayer = player)
      .then(() => {
          if (this.state.currentUser) {
               UserService.getFollowingPlayers(this.state.currentUser.id)
                  .then(following => {
                      userFollowing = _.map(following, 'api_id');
                  })
                  .catch(userFollowing = [])
      }})
      .then(() =>
        PlayerService.getPlayerDetails(this.state.playerId)
          .then(details => this.setState({
            currentPlayer: currentPlayer,
            userFollowing: userFollowing,
            player: details,
          })));
  }

  addToFollowing = () => {
    UserService.addFollowingPlayer(this.state.currentUser.id, this.state.currentPlayer.id)
      .then(following => {
        let followingPlayer = _.map(following, 'api_id');
        this.setState({
          userFollowing: followingPlayer
        })
      })
  };

  removeFromFollowing = () => {
    UserService.removeFollowingPlayer(this.state.currentUser.id, this.state.currentPlayer.id)
      .then(following => {
        let followingPlayer = _.map(following, 'api_id');
        this.setState({
          userFollowing: followingPlayer
        })
      })
  };

  render() {
    return (
      <div className='profile-content'>
        <div className='profile-body'>
          <div className="row">
            {this.state.player != null &&
              <div className="profile-left col-md-3">
                <div>
                  <ul className='list-group'>
                    <li className="list-group-item">
                      <div className="row justify-content-center align-items-center">
                            <img src={player_img} alt="" width={"50%"} />
                      </div>
                      <div className="row justify-content-center player-name">
                        {this.state.player.name}
                      </div>
                    </li>
                    {this.state.player.team &&
                      <li className="list-group-item ">Team: {this.state.player.team.market + ' ' + this.state.player.team.name}</li>}
                    <li className="list-group-item">Position: {this.state.player.position}</li>
                    <li className="list-group-item">Jersey: {this.state.player.jersey}</li>
                    <li className="list-group-item">Birthdate: {this.state.player.birth_date}</li>
                    <li className="list-group-item">Birthplace: {this.state.player.birth_place}</li>
                    <li className="list-group-item">Height: {this.state.player.height} inches</li>
                    <li className="list-group-item">Weight: {this.state.player.weight} pounds</li>
                    <li className="list-group-item">Rookie Year: {this.state.player.rookie_year}</li>
                  </ul>
                </div>
                {
                  this.state.currentUser &&
                  <div className="follow-section"> {
                    this.state.userFollowing.includes(this.state.playerId) ?
                      <button onClick={() => this.removeFromFollowing()}
                        className="btn un-fav-button">Un-follow Player </button> :
                      <button onClick={() => this.addToFollowing()}
                        className="btn btn-success fav-button">Follow Player </button>
                  }
                  </div>
                }
              </div>
            }
            <div className="profile-right col-md-9">
              <CommentBoxForPlayer playerId={this.state.playerId}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PlayerDetails)