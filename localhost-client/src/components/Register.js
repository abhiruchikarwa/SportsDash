import React, { Component } from 'react'
import '../styles/register.style.client.css'
import UserService from '../services/UserService'
import { withRouter } from 'react-router-dom'

class Register extends Component {
    register = () => {
        let user = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            // type: document.querySelector('input[name=role]:checked').value
        }
        if(user.username==="" || user.password==="")
            alert("Username and Password can't be empty")
        else {
            UserService.register(user).then(res => {
                sessionStorage.setItem('currentUser', res.id);
                this.props.history.push('/profile/' + res.id + '/false')
            })
        }
    }


    render() {
        return (
            <div className='register-content'>
                <div className='register-body'>
                    <p>Required fields with *</p>
                    <div className='register-input'>
                        <p>Username *</p>
                        <input type="text"
                            className="form-control"
                            id="username"
                            placeholder="username" />
                    </div>
                    <div className='register-input'>
                        <p>Password *</p>
                        <input type="text"
                            className="form-control"
                            id="password"
                            placeholder="password" />
                    </div>
                    <div className='register-input'>
                        <p>First Name</p>
                        <input type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First Name" />
                    </div>
                    <div className='register-input'>
                        <p>Last Name</p>
                        <input type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name" />
                    </div>
                    <div className='register-input'>
                        <p>Email</p>
                        <input type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email" />
                    </div>
                    {/*<div className='register-input'>*/}
                        {/*<p>Role</p>*/}
                        {/*<label>*/}
                            {/*<input name="role" value='USER' type="radio" />&nbsp;User&nbsp;*/}
                        {/*</label>*/}
                        {/*<label>*/}
                            {/*<input name="role" value='PLAYER' type="radio" />&nbsp;Player&nbsp;*/}
                        {/*</label>*/}
                        {/*<label>*/}
                            {/*<input name="role" value='COACH' type="radio" />&nbsp;Coach*/}
                        {/*</label>*/}
                    {/*</div>*/}
                </div>
                <div className='register-pos'>
                    <button onClick={() => { this.register() }}
                        className="register-button btn-block">
                        Register
                    </button>
                    <button onClick={() => { this.props.history.push('/') }}
                        className="register-cancel-button btn-block">
                        Cancel
                    </button>
                    <p className='register-text'>
                        Already have an account ?&nbsp;
                        <span className="register-link" onClick={() => this.props.history.push('/login')}>
                            Login.
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}
export default withRouter(Register)