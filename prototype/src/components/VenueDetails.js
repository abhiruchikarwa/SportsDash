import React, { Component } from 'react'
import _ from 'lodash';

import '../styles/favorite.style.client.css'
import '../styles/schedule.style.client.css'

import { withRouter } from 'react-router-dom'
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
      .then(venue => this.setState({ venue }));
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
                    <img className="card-img" src={VenueService.getVenueImage('random')} alt="venue" />
                    <div class="card-img-overlay">
                      <div className="card-body text-center">
                        <ul class="list-group list-group-flush col-3 schedule-card:hover">
                          {!_.isEmpty(this.state.venue.address) && <li class="list-group-item">
                            Address - {this.state.venue.address}, {this.state.venue.city}  - {this.state.venue.zip}
                          </li>}
                          {!_.isEmpty(this.state.venue.state) && <li class="list-group-item">
                            State - {this.state.venue.state}
                          </li>}
                          {!_.isEmpty(this.state.venue.country) && <li class="list-group-item">
                            Country - {this.state.venue.country}
                          </li>}
                          {!_.isEmpty(this.state.venue.surface) && <li class="list-group-item">
                            Surface - {this.state.venue.surface}
                          </li>}
                          {!_.isEmpty(this.state.venue.roofType) && <li class="list-group-item">
                            Roof type - {this.state.venue.roofType}
                          </li>}
                          {!_.isEmpty(this.state.venue.capacity) && <li class="list-group-item">
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