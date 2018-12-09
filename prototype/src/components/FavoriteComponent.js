import React, {Component} from 'react'
import '../styles/favorite.style.client.css'
import {withRouter} from 'react-router-dom'
import TeamService from "../services/TeamService";
import UserService from "../services/UserService";

class FavoriteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteTeams: [],
            followingPlayers: []
        }
    }

    componentDidMount() {
        UserService.getFavoriteTeams(1)
            .then(favTeams => this.setState({
                favoriteTeams: favTeams
            }))
            .then(() => UserService.getFollowingPlayers(1)
                .then(followingPlayers => this.setState({
                    followingPlayers: followingPlayers
                })));
    }

    render() {
        return (
            <div>
                <div className="container-fluid fav-box">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header text-center heading-text">
                                    Your Favorites
                                </div>
                                <div className="card-body row scrollable justify-content-center">
                                    <div className="card card-subtitle col-md-12">
                                        <p className="subtitle">Favorite Teams</p>
                                    </div>
                                    {
                                        this.state.favoriteTeams && this.state.favoriteTeams.map((team, index) =>
                                            <div key={index}
                                                 className="card col-md-2 card-view-item shadow justify-content-center align-items-center">
                                                <div
                                                    onClick={() => this.props.history.push('/details?filter=team&id=' + team.id)}
                                                    className="card-link justify-content-center align-items-center">
                                                    <div className="card-body align-items-center">
                                                        <img src={TeamService.getTeamLogo(team.name)}
                                                             className="fav-img" width={"40px"}/>
                                                        <p className="card-title">{team.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="card card-subtitle col-md-12 mt-3">
                                        <p className="subtitle">Favorite Players</p>
                                    </div>
                                    {
                                        this.state.followingPlayers && this.state.followingPlayers.map((player, index) =>
                                            <div key={index}
                                                 className="card col-md-2 card-view-item shadow justify-content-center align-items-center">
                                                <div
                                                    onClick={() => this.props.history.push('/details?filter=player&id=' + player.id)}
                                                    className="card-link justify-content-center align-items-center">
                                                    <div className="card-body align-items-center">
                                                        <p className="card-title">{player.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(FavoriteComponent);