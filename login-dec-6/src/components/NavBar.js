import React, {Component} from 'react'
import '../styles/nav-bar.style.client.css'
import {withRouter} from 'react-router-dom'

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    login = () => {
        //const urlParams = new URLSearchParams(this.props.location.search)
        //const curId = urlParams.get('id')
        const curId = sessionStorage.getItem('currentUser');
        if(curId != null)
            this.props.history.push('/'+ curId +'/profile/false')
        else
            this.props.history.push('/login')
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar row fixed-top navbar-expand-lg main_nav">
                    <a className="navbar-brand main_title" href="/">My Sports Dash</a>
                    <div className="profile-button"
                        onClick={() => {this.login()}}>
                        <i className="btn fa fa-user fa-2x text-white"/>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(NavBar);