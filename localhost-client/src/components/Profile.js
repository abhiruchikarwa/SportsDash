import React, { Component } from 'react'
import '../styles/profile.style.client.css'
import CommentBox from "./CommentBox";
import { withRouter } from 'react-router-dom'
import PersonalInfo from './PersonalInfo'
import FavoriteComponent from "./FavoriteComponent";

class Profile extends Component {
    constructor(props) {
        super(props)
        const uid = this.props.match.params.userId;
        const isEdit = this.props.match.params.edit;
        //const urlParams = new URLSearchParams(this.props.location.search)
        //const curId = urlParams.get('id')
        const curId = sessionStorage.getItem('currentUser')
        this.state = {
            userId: uid,
            isEdit: isEdit,
            isSelf: curId === uid
        }
    }

    componentWillUpdate(newProps) {
        if (this.props !== newProps) {
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
                        <div className="profile-left col-sm-3">
                            <PersonalInfo
                                userId={this.state.userId}
                                isEdit={this.state.isEdit}
                                isSelf={this.state.isSelf} />
                        </div>
                        <div className="profile-right col-sm-9">
                            <CommentBox />
                            <FavoriteComponent />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Profile)