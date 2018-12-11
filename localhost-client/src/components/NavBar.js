import React, {Component} from 'react'
import '../styles/nav-bar.style.client.css'
import {withRouter} from 'react-router-dom'
import UserService from "../services/UserService";

class NavBar extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            currentUser: user
        }
    }

    login = () => {
        if (this.state.currentUser != null)
            this.props.history.push('/profile/' + this.state.currentUser.id);
        else
            this.props.history.push('/login');
    };

    logout = () => {
        UserService.logout()
            .then(() => sessionStorage.clear())
    };

    render() {
        return (
            <div className="container">
                <nav className="navbar row fixed-top navbar-expand-lg main_nav">
                    <a className="navbar-brand main_title" href="/">My Sports Dash</a>
                    {
                        this.state.currentUser &&
                        <div className="logout-button"
                             onClick={() => this.logout()}>
                            <i className="fas fa-sign-out-alt fa-2x text-white"/>
                        </div>
                    }
                    <div className={this.state.currentUser ? "profile-button" : "profile-button-right"}
                         onClick={() => this.login()}>
                        <i className="btn fa fa-user fa-2x text-white"/>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(NavBar);