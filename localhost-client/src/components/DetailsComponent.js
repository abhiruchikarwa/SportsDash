import React, { Component } from 'react'
import queryString from 'query-string'
import '../styles/schedule.style.client.css'
import { withRouter } from 'react-router-dom';

import TeamDetails from '../components/TeamDetails';
import GameDetails from '../components/GameDetails';
import VenueDetails from '../components/VenueDetails';
import PlayerDetails from '../components/PlayerDetails';

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
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
            case 'players':
              return <PlayerDetails id={this.state.id} />
            case 'teams':
              return <TeamDetails id={this.state.id} />
            case 'games':
              return <GameDetails id={this.state.id} />
            case 'venues':
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
