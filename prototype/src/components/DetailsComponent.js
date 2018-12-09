import React, { Component } from 'react'
import queryString from 'query-string'
import '../styles/schedule.style.client.css'
import { withRouter } from 'react-router-dom';

import TeamDetails from '../components/TeamDetails';
import GameDetails from '../components/GameDetails';
import VenueDetails from '../components/VenueDetails';


class DetailsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      id: '',
    };
  }

  componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      this.setState({
        filter: values.filter,
        id: values.id,
      });
    }
  }

  render() {
    return (
      <div>
        {(() => {
          switch (this.state.filter) {
            // case 'player':
            //   return <PlayerDetails id={this.state.id} />
            case 'team':
              return <TeamDetails id={this.state.id} />
            case 'game':
              return <GameDetails id={this.state.id} />
            case 'venue':
              return <VenueDetails id={this.state.id} />
            default:
              return <h1>Invalid Details</h1>
          }
        })()}
      </div>
    );
  }
}

export default withRouter(DetailsComponent);
