import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import UserDetails from './UserDetails'
import FavoriteComponent from "./FavoriteComponent";
import UserService from '../services/UserService';
import '../styles/profile.style.client.css'
import CommentBoxForUser from "./CommentBoxForUser";
import PlayerProfileDetails from "./PlayerProfileDetails";
import CommentBoxForPlayer from "./CommentBoxForPlayer";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.currentUser = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            userId: '',
            user: {},
            currentUser: this.currentUser
        };
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.userId) {
            const userId = this.props.match.params.userId;
            UserService.getUserDetails(userId)
                .then((user) => {
                    this.setState({
                        userId,
                        user,
                    });
                });
        }
    }

    componentWillUpdate(newProps) {
        if (this.props !== newProps) {
            this.setState({
                userId: newProps.match.params.userId,
                isEdit: newProps.match.params.edit,
                isSelf: newProps.match.params.userId === JSON.parse(sessionStorage.getItem('user')).id,
            })
        }
    }

    updateUser(userToUpdate) {
        UserService.updateUser(userToUpdate)
            .then((user) => {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.setState({user});
            });
    }

    render() {
        return (
            <div className='profile-content'>
                <div className='profile-body'>
                    <div className="row">
                        <div className="col-3 profile-box">
                            {
                                this.currentUser.type === "USER" ?
                                    <UserDetails
                                        userId={this.state.userId}
                                        user={this.state.user}
                                        updateUser={this.updateUser}/> :
                                    <PlayerProfileDetails
                                        playerId={this.props.match.params.userId}/>
                            }
                        </div>
                        <div className="col-6 profile-comment">
                            {
                                this.currentUser.type === "USER" ?
                                    <CommentBoxForUser userId={this.props.match.params.userId}/>
                                    :
                                    <div>
                                        {this.state.user.playerApiId &&
                                        <div>
                                            <CommentBoxForUser
                                                userId={this.props.match.params.userId}/>
                                            <CommentBoxForPlayer
                                                playerId={this.state.user.playerApiId}/>
                                        </div>
                                        }
                                    </div>
                            }
                        </div>
                        <div className="col-3 profile-fav">
                            <FavoriteComponent/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)