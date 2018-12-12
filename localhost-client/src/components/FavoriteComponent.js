import React, {Component} from 'react'
import '../styles/favorite.style.client.css'
import _ from 'lodash'
import {withRouter} from 'react-router-dom'
import TeamService from "../services/TeamService";
import UserService from "../services/UserService";

class FavoriteComponent extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            favoriteTeams: [],
            followingPlayers: [],
            currentUser: user
        }
    }

    componentDidMount() {
        let uid = _.includes(this.props.location.pathname, "profile") ? this.props.match.params.userId : this.state.currentUser.id;
        UserService.getFavoriteTeams(uid)
            .then(favTeams => this.setState({
                favoriteTeams: favTeams
            }))
            .then(() => UserService.getFollowingPlayers(uid)
                .then(followingPlayers => this.setState({
                    followingPlayers: followingPlayers
                })));
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card fav-card">
                            <div className="card-header text-center heading-text">
                                Your Favorites/Following
                            </div>
                            <div className="card-body row scrollable justify-content-center">
                                <div className="card card-subtitle col-md-12">
                                    <p className="subtitle">Favorite Teams</p>
                                </div>
                                {
                                    this.state.favoriteTeams && this.state.favoriteTeams.length > 0 ? this.state.favoriteTeams.map((team, index) =>
                                        <div key={index}
                                             className="card col-md-2 card-view-item shadow justify-content-center align-items-center">
                                            <div
                                                onClick={() => this.props.history.push('/details?filter=teams&id=' + team.api_id)}
                                                className="card-link justify-content-center align-items-center">
                                                <div className="card-body align-items-center">
                                                    <img alt="logo" src={TeamService.getTeamLogo(team.name)}
                                                         className="fav-img" width={"40px"}/>
                                                    <p className="card-title">{team.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                        <div className="no-favorite">
                                            Oops.. Did'nt find any favorites. Please add some..!
                                        </div>
                                }
                                <div className="card card-subtitle col-md-12 mt-3">
                                    <p className="subtitle">Favorite Players</p>
                                </div>
                                {
                                    this.state.followingPlayers && this.state.followingPlayers.length > 0 ? this.state.followingPlayers.map((player, index) =>
                                        <div key={index}
                                             className="card col-md-2 card-view-item shadow justify-content-center align-items-center">
                                            <div
                                                onClick={() => this.props.history.push('/details?filter=players&id=' + player.api_id)}
                                                className="card-link justify-content-center align-items-center">
                                                <div className="card-body align-items-center">
                                                    <p className="card-title">{player.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                        <div className="no-following">
                                            Oops.. Did'nt find any following. Please add some..!
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(FavoriteComponent);