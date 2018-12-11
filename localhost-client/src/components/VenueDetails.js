import React, {Component} from 'react'
import _ from 'lodash';

import '../styles/favorite.style.client.css'
import '../styles/schedule.style.client.css'

import {withRouter} from 'react-router-dom'
import VenueService from "../services/VenueService";

class VenueDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            venueId: this.props.id,
            venue: {}
        };
    }

    componentDidMount() {
        VenueService.getVenueDetails(this.state.venueId)
            .then(venue => this.setState({venue}));
    }

    render() {
        console.log(this.state.venue);
        return (
            <div>
                <div className="container-fluid fav-box">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header text-center heading-text">
                                    {this.state.venue.name}
                                </div>
                                <div className="card-body text-center">
                                    <div className="card">
                                        <img className="card-img"
                                             src={VenueService.getVenueImage(this.state.venue.name)} alt="venue"/>
                                        <div className="card-img-overlay">
                                            <div className="card-body text-center">
                                                <ul className="list-group col-3 venue-card">
                                                    {!_.isEmpty(this.state.venue.address) &&
                                                    <li className="list-group-item match-details">
                                                        Address
                                                        - {this.state.venue.address}, {this.state.venue.city} - {this.state.venue.zip}
                                                    </li>}
                                                    {!_.isEmpty(this.state.venue.state) &&
                                                    <li className="list-group-item match-details">
                                                        State - {this.state.venue.state}
                                                    </li>}
                                                    {!_.isEmpty(this.state.venue.country) &&
                                                    <li className="list-group-item match-details">
                                                        Country - {this.state.venue.country}
                                                    </li>}
                                                    {!_.isEmpty(this.state.venue.surface) &&
                                                    <li className="list-group-item match-details">
                                                        Surface - {this.state.venue.surface}
                                                    </li>}
                                                    {!_.isEmpty(this.state.venue.roofType) &&
                                                    <li className="list-group-item match-details">
                                                        Roof type - {this.state.venue.roofType}
                                                    </li>}
                                                    {!_.isEmpty(this.state.venue.capacity) &&
                                                    <li className="list-group-item match-details">
                                                        Capacity - {this.state.venue.capacity}
                                                    </li>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(VenueDetails);