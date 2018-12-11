import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import UserDetails from './UserDetails'
import CommentBoxForPlayer from "./CommentBoxForPlayer";
import FavoriteComponent from "./FavoriteComponent";

import UserService from '../services/UserService';
import '../styles/profile.style.client.css'
import CommentBoxForUser from "./CommentBoxForUser";

class Profile extends Component {
    constructor(props) {
        super(props);
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            userId: '',
            user: {},
            currentUser,
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
                        <div className="profile-left col-3">
                            <UserDetails
                                userId={this.state.userId}
                                user={this.state.user}
                                isSelf={this.state.currentUser === this.state.user}
                                updateUser={this.updateUser}/>
                        </div>
                        <div className="profile-right col-9">
                            <CommentBoxForUser userId={this.props.match.params.userId}/>
                            <FavoriteComponent/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)