import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CommentBox from "./CommentBox";
import PersonalInfo from './PersonalInfo'
import FavoriteComponent from "./FavoriteComponent";

import UserService from '../services/UserService';
import '../styles/profile.style.client.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        const currentUser = sessionStorage.getItem('user')
        this.followed = false
        this.state = {
            userId: '',
            user: {},
        }
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
            this.followed = true
            this.setState({
                userId: newProps.match.params.userId,
                isEdit: newProps.match.params.edit,
                isSelf: newProps.match.params.userId === sessionStorage.getItem('currentUser')
            })
        }
    }

    render() {
        return (
            <div className='profile-content'>
                <div className='profile-body'>
                    <div className="row">
                        <div className="profile-left col-3">
                            <PersonalInfo
                                userId={this.state.userId}
                                isEdit={this.state.isEdit}
                                isSelf={this.state.isSelf} />
                            {!this.state.isSelf && !this.followed &&
                                <button className='pI-button'>Follow</button>}
                            {!this.state.isSelf && this.followed &&
                                <button className='pI-button'>Unfollow</button>}
                        </div>
                        <div className="profile-right col-9">
                            <CommentBox />
                            <FavoriteComponent dashOrProf='Prof' />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Profile)