import React, { Component } from 'react'
import '../styles/login.style.client.css'
import UserService from '../services/UserService'
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin(event) {
        const username = this.state.username !== '' ? this.state.username : ''
        const password = this.state.password !== '' ? this.state.password : ''
        UserService.login({ username, password })
            .then((res) => {
                sessionStorage.setItem('user', JSON.stringify(res));
                this.props.history.push('/home');
            })
            .catch((err) => {
                alert('Invalid credentials, please check if you are registered or check credntials.');
            });
        event.preventDefault();
    }

    componentWillUnmount() {
        this.props.forceUpdate();
    }

    render() {
        return (
            <div className="card login-content">
                <form onSubmit={this.handleLogin}>
                    <div className="form-group row">
                        <label htmlFor="username-input"> Username: </label>
                        <input id="username-input" type="text" className="form-control" placeholder="Enter username"
                            onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password-input"> Password: </label>
                        <input id="password-input" type="password" className="form-control" placeholder="Enter password"
                            onChange={this.handlePasswordChange} />
                    </div>
                    <input className="btn-block login-button" type="submit" value="Sign in" />
                    <button className="btn-block login-register-button" type="submit"
                        onClick={() => this.props.history.push('/register')}>Register
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)