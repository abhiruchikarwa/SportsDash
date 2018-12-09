import React, {Component} from 'react'
import '../styles/nav-bar.style.client.css'

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar row fixed-top navbar-expand-lg main_nav">
                    <div className="col-md-6">
                        <a className="navbar-brand main_title" href="#">My Sports Dash</a>
                    </div>
                    <div className="col-md-6 profile-button">
                        <i className="fas fa-user text-white"/>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;