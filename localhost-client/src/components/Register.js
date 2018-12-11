import React, { Component } from 'react'
import '../styles/register.style.client.css'
import UserService from '../services/UserService'
import { withRouter } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            type: '',
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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

    handleFirstnameChange(event) {
        this.setState({
            firstName: event.target.value
        });
    }

    handleLastnameChange(event) {
        this.setState({
            lastName: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleTypeChange(event) {
        this.setState({
            type: event.target.value
        });
    }

    handleRegister(event) {
        const user = {
            username: this.state.username !== '' ? this.state.username : '',
            password: this.state.password !== '' ? this.state.password : '',
            firstName: this.state.firstName !== '' ? this.state.firstName : '',
            lastName: this.state.lastName !== '' ? this.state.lastName : '',
            email: this.state.email !== '' ? this.state.email : '',
            type: this.state.type !== '' ? this.state.type : '',
        }
        UserService.register(user)
            .then((res) => {
                sessionStorage.setItem('user', JSON.stringify(res));
                this.props.history.push('/home')
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className='card register-content'>
                <form onSubmit={this.handleRegister} >
                    <div className="form-group row">
                        <label htmlFor="username-input"> Username: </label>
                        <input id="username-input" type="text" className="form-control" placeholder="Enter username"
                            required onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password-input"> Password: </label>
                        <input id="password-input" type="password" className="form-control" placeholder="Enter password"
                            required onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="firstname-input"> First Name: </label>
                        <input id="firstname-input" type="text" className="form-control" placeholder="Enter first name"
                            required onChange={this.handleFirstnameChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastname-input"> Last Name: </label>
                        <input id="lastname-input" type="text" className="form-control" placeholder="Enter last name"
                            required onChange={this.handleLastnameChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email-input"> Email: </label>
                        <input id="email-input" type="email" className="form-control" placeholder="Enter email"
                            required onChange={this.handleEmailChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="type-input"> Pick your favorite flavor: </label>
                        <select required id="type-input" className="form-control" onChange={this.handleTypeChange}>
                            <option value="USER">User</option>
                            <option value="PLAYER">Player</option>
                            <option value="COACH">Coach</option>
                        </select>
                    </div>
                    <input className="btn-block login-register-button" type="submit" value="Register" />
                    <button className="btn-block login-button" onClick={() => this.props.history.push('/profile')}>Log in</button>
                </form>

            </div>
        )
    }
}
export default withRouter(Register)