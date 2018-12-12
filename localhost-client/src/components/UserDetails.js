import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/profile.style.client.css'

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.currentUser = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            editMode: false,
            password: '',
            email: '',
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.showEditFields = this.showEditFields.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: this.props.user,
            password: this.props.user.password,
            email: this.props.user.email,
        })
    }

    componentWillUpdate(newProps) {
        if (this.props !== newProps) {
            this.setState({
                user: newProps.user,
                password: this.props.user.password,
                email: this.props.user.email,
            })
        }
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleUpdate(event) {
        if (this.state.email === '' || this.state.password === '') {
            alert('Can not set values to empty');
            this.setState({ editMode: false });
            event.preventDefault();
            return
        }
        const user = {
            id: this.props.userId,
            username: this.props.user.username,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            type: this.props.user.type,
            email: this.state.email,
            password: this.state.password,
        }
        this.props.updateUser(user);
        this.setState({ editMode: false });
        event.preventDefault();
    }

    showEditFields(event) {
        this.setState({ editMode: true });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <ul className='list-group'>
                    <li className="list-group-item">
                        <div className="row justify-content-center align-items-center">
                            <i className="fas fa-3x fa-user player-pic" />
                        </div>
                        {this.props.user && <div className="row justify-content-center player-name">
                            {this.props.user.firstName + ' ' + this.props.user.lastName}
                        </div>}
                    </li>
                    {this.props.user &&
                        <li className="list-group-item">Username: {this.props.user.username}</li>}
                    {this.props.user &&
                        <li className="list-group-item">Type: {this.props.user.type}</li>}
                    {!this.state.editMode && this.props.user &&
                        <li className="list-group-item">Email: {this.props.user.email}</li>}
                    {this.state.editMode && this.props.isSelf && this.props.user &&
                        <div className="form-group list-group-item">
                            <label htmlFor="email-input"> Email: </label>
                            <input
                                id="email-input" type="email" value={this.state.email}
                                className="form-control" placeholder="Enter email"
                                required onChange={this.handleEmailChange} />
                        </div>}

                    {!this.state.editMode && this.props.isSelf && this.props.user &&
                        <li className="list-group-item">Password: {this.props.user.password}</li>
                    }
                    {this.state.editMode && this.props.isSelf && this.props.user &&
                        <div className="form-group list-group-item">
                            <label htmlFor="password-input"> Password: </label>
                            <input
                                id="password-input" type="password" value={this.state.password}
                                className="form-control" placeholder="Enter password"
                                required onChange={this.handlePasswordChange} />
                        </div>}
                </ul>
                {this.props.isSelf && (!this.state.editMode ?
                    <button className="btn-block pI-button" onClick={this.showEditFields}>Update</button>
                    :
                    <button className="btn-block pI-button" onClick={this.handleUpdate}>Set Values</button>)
                }
            </div>
        )
    }
}

export default withRouter(UserDetails)