import React, {Component} from 'react'
import '../styles/login.style.client.css'
import UserService from '../services/UserService'
import {withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    login = () => {
        let user = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }
        let userId = UserService.login(user)
        sessionStorage.setItem('currentUser', userId);
        this.props.history.push('/'+ userId +'/profile/false')
    }

    render(){
        return (
            <div className="login-content">
                <div className="login-body">
                    <div className="login-input">
                        <p>username</p>
                        <input 	type="text"
                            className="form-control"
                            id="username"
                            onChange={this.usernameChanged}
                            placeholder="username"/>
                    </div>
                    <div className="login-input">
                        <p>password</p>
                        <input 	className="form-control"
                                  id="password"
                                  onChange={this.passwordChanged}
                                  placeholder="password"/>
                    </div>
                </div>
                <div className='login-pos'>
                    <button onClick={()=>{this.login()}}
                         className="btn-block login-button">
                        Sign in
                    </button>
                    <button onClick={()=>{this.props.history.push('/')}}
                         className="btn-block login-cancel-button">
                        Cancel
                    </button>
                    <p className='login-text'>
                        New User? &nbsp;
                        <span className='login-link' onClick={() => this.props.history.push('/register')}>
                            Sign up.
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)