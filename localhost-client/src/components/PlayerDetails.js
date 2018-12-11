import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import CommentBox from './CommentBox';
import PlayerService from '../services/PlayerService';
import '../styles/profile.style.client.css';
import UserService from "../services/UserService";
import _ from "lodash";

class PlayerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: this.props.id,
            player: {},
            currentPlayer: {},
            user: {
                id: 1
            },
            userFollowing: []
        }
    }

    componentDidMount() {
        let currentPlayer;
        PlayerService.getPlayerByApiId(this.state.playerId)
            .then(player => currentPlayer = player)
            .then(PlayerService.getPlayerDetails(this.state.playerId)
                .then(player => this.setState({
                    player: player,
                    currentPlayer: currentPlayer
                })));
    }

    addToFollowing = () => {
        UserService.addFollowingPlayer(this.state.user.id, this.state.currentPlayer.id)
            .then(following => {
                let followingPlayer = _.map(following, 'api_id');
                this.setState({
                    userFollowing: followingPlayer
                })
            })
    };

    removeFromFollowing = () => {
        UserService.removeFollowingPlayer(this.state.user.id, this.state.currentPlayer.id)
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
                                            <i className="fas fa-3x fa-user player-pic"/>
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
                            <div className="follow-section">
                                {
                                    this.state.userFollowing.includes(this.state.playerId) ?
                                        <button onClick={() => this.removeFromFollowing()}
                                                className="btn un-fav-button">Un-follow Player
                                        </button> :
                                        <button onClick={() => this.addToFollowing()}
                                                className="btn btn-success fav-button">Follow Player
                                        </button>
                                }
                            </div>
                        </div>
                        }
                        <div className="profile-right col-md-9">
                            <CommentBox/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PlayerDetails)