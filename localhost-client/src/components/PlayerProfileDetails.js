import React, { Component } from 'react'
import PlayerService from "../services/PlayerService";
import player_img from "../resources/images/player_image/american_football.png";
import '../styles/player-user-detaisl.style.client.css'

export default class PlayerProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.currentUser = this.props.user;
        this.state = {
            currentPlayer: {},
            playerDetails: {},
            email: '',
            password: '',
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.showEditFields = this.showEditFields.bind(this);
    }

    componentDidMount() {
        let currentPlayer;
        if(this.currentUser) {
            PlayerService.getPlayerById(this.currentUser.id)
                .then(player => {
                    currentPlayer = player;
                    PlayerService.getPlayerDetails(player.api_id)
                        .then(details => this.setState({
                            currentPlayer: currentPlayer,
                            playerDetails: details,
                            email: this.currentUser.email,
                            password: this.currentUser.password,
                        }))
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            let currentPlayer;
            this.currentUser = this.props.user;
            PlayerService.getPlayerById(this.props.user.id)
                .then(player => {
                    currentPlayer = player;
                    PlayerService.getPlayerDetails(player.api_id)
                        .then(details => this.setState({
                            currentPlayer: currentPlayer,
                            playerDetails: details,
                            email: this.currentUser.email,
                            password: this.currentUser.password,
                        }))
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
            id: this.currentUser.id,
            username: this.currentUser.username,
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName,
            type: this.currentUser.type,
            email: this.state.email,
            password: this.state.password,
        };

        this.props.updateUser(user);
        this.setState({
            editMode: false,
        });
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
                            <img src={player_img} alt="" width={"50%"} />
                        </div>
                        {this.currentUser && <div className="row justify-content-center player-name">
                            {this.currentUser.firstName + ' ' + this.currentUser.lastName}
                        </div>}
                    </li>
                    {this.currentUser &&
                        <li className="list-group-item">Username: {this.currentUser.username}</li>}
                    {this.currentUser &&
                        <li className="list-group-item">Type: {this.currentUser.type}</li>}
                    {!this.state.editMode && this.currentUser &&
                        <li className="list-group-item">Email: {this.currentUser.email}</li>}
                    {this.state.editMode && this.currentUser && this.props.isSelf &&
                        <div className="form-group list-group-item">
                            <label htmlFor="email-input"> Email: </label>
                            <input id="email-input" type="email" className="form-control" placeholder="Enter email"
                                   defaultValue={this.state.email}
                                required onChange={this.handleEmailChange} />
                        </div>}

                    {!this.state.editMode && this.currentUser && this.props.isSelf &&
                        <li className="list-group-item">Password: {this.currentUser.password}</li>
                    }
                    {this.state.editMode && this.currentUser && this.props.isSelf &&
                        <div className="form-group list-group-item">
                            <label htmlFor="password-input"> Password: </label>
                            <input id="password-input" type="password" className="form-control" placeholder="Enter password"
                                   defaultValue={this.state.password}
                                required onChange={this.handlePasswordChange} />
                        </div>}
                    {this.state.playerDetails && this.state.playerDetails.team && (
                        <div>
                            <li className="list-group-item ">Team: {this.state.playerDetails.team.market + ' ' + this.state.playerDetails.team.name}</li>
                            <li className="list-group-item">Position: {this.state.playerDetails.position}</li>
                            <li className="list-group-item">Jersey: {this.state.playerDetails.jersey}</li>
                            <li className="list-group-item">Birthdate: {this.state.playerDetails.birth_date}</li>
                            <li className="list-group-item">Birthplace: {this.state.playerDetails.birth_place}</li>
                            <li className="list-group-item">Height: {this.state.playerDetails.height} inches</li>
                            <li className="list-group-item">Weight: {this.state.playerDetails.weight} pounds</li>
                        </div>
                    )}
                </ul>
                {this.props.isSelf && (!this.state.editMode ?
                    <button className="btn-block pI-button" onClick={this.showEditFields}>Update</button>
                    :
                    <button className="btn-block pI-button" onClick={this.handleUpdate}>Set Values</button>)
                }
            </div>
        );
    }
}