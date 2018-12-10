import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import UserService from '../services/UserService'
import '../styles/profile.style.client.css'

class PersonalInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},
            isSelf: this.props.isSelf,
            isEdit: this.props.isEdit
        }
        UserService.getInfo(this.props.userId).then(res => {
            if(res.status===500) {
                alert("No Such User")
                this.props.history.push('/')
            }else
                this.setState({
                    info: res,
                })})
    }

    componentWillUpdate(newProps) {
        if (this.props !== newProps) {
            UserService.getInfo(newProps.userId).then(res => {
                if(res.status===500)
                    this.props.history.push('/')
                else
                    this.setState({
                    info: res,
                    isSelf: newProps.isSelf,
                    isEdit: newProps.isEdit
                })})
        }
    }

    edit = () => {
        this.props.history.push('/profile/' + this.props.userId + '/true')
    };

    update = () => {
        let user = {
            id: this.state.info.id,
            password: document.getElementById("password").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
        };
        UserService.updateUser(user).then((res) =>
        this.props.history.push('/profile/' + this.props.userId + '/false'))
    };

    logOut = () => {
        sessionStorage.removeItem('currentUser')
        this.props.history.push('/')
    };

    render() {
        return (
            <div>
                {console.log(this.state)}
                {this.state.info !== null &&
                    (this.state.isEdit !== 'true' ||
                        (this.state.isEdit === 'true' && !this.state.isSelf)) &&
                    <div className="pI-body">
                        <div>
                            <i className="fa fa-5x fa-user" />
                        </div>
                        <br />
                        <div className='pI-text'>
                            {this.state.isSelf === true &&
                                <p>Username: <br />{this.state.info.username}<br /><br />
                                    Password: <br />{this.state.info.password}</p>}
                            <p>Full Name: <br />{this.state.info.firstName}&nbsp;{this.state.info.lastName}</p>
                            <p>Email: <br />{this.state.info.email}</p>
                            {/*{this.state.info.type !== "USER" &&*/}
                            {/*<p>Team: <br/>{this.state.info.team.name}&nbsp;*/}
                            {/*<img src={TeamService.getTeamLogo(this.state.info.team.name)}*/}
                            {/*className="fav-img" width={"40px"}/><br/><br/>*/}
                            {/*Seasons: <br/> {}</p>}*/}
                        </div>
                        {this.state.isSelf === true &&
                            <button className="pI-button" onClick={() => {
                                this.edit()
                            }}>
                                Edit
                    </button>}
                        {this.state.isSelf === true &&
                            <button className="pI-button" onClick={() => {
                                this.logOut()
                            }}>
                                Log out
                    </button>}
                    </div>}
                {this.state.info !== null && this.state.isEdit === 'true' && this.state.isSelf &&
                    <div className="pI-body">
                        <div>
                            <i className="fa fa-5x fa-user" />
                        </div>
                        <br />
                        <div className='pI-text'>
                            <p>Username: <br />{this.state.info.username}<br /><br /></p>
                            <p>Password:</p>
                            <input type='text' className='register-input form-control'
                                id="password"
                                defaultValue={this.state.info.password}
                                placeholder="password" />
                            <p>First Name:</p>
                            <input type='text' className='register-input form-control'
                                id="firstName"
                                defaultValue={this.state.info.firstName}
                                placeholder="First Name" />
                            <p>Last Name:</p>
                            <input type='text' className='register-input form-control'
                                id="lastName"
                                defaultValue={this.state.info.lastName}
                                placeholder="Last Name" />
                            <p>Email:</p>
                            <input type='text' className='register-input form-control'
                                id="email"
                                defaultValue={this.state.info.email}
                                placeholder="email" />
                            {/*{this.state.info.type !== "USER" &&*/}
                            {/*<p>Team: <br/>{this.state.info.team.name}&nbsp;*/}
                            {/*<img src={TeamService.getTeamLogo(this.state.info.team.name)}*/}
                            {/*className="fav-img" width={"40px"}/><br/><br/>*/}
                            {/*Seasons: <br/> {}</p>}*/}
                        </div>
                        {this.state.isSelf === true &&
                            <button className="pI-button" onClick={() => {
                                this.update()
                            }}>
                                Update
                    </button>}
                        {this.state.isSelf === true &&
                            <button className="pI-button" onClick={() => {
                                this.logOut()
                            }}>
                                Log out
                    </button>}
                    </div>}
            </div>
        )
    }
}

export default withRouter(PersonalInfo)