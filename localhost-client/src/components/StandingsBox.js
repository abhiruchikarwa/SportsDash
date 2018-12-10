import React, { Component } from 'react'
import '../styles/standing.style.client.css'
import TeamService from "../services/TeamService";
import { withRouter } from 'react-router-dom'
import StandingService from "../services/StandingService";

class StandingsBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: []
        };
    }

    TableBodyComponent = ({ team }) => {
        return (
            <tr onClick={() => this.props.history.push('/details?filter=teams&id=' + team.id)}
                className="d-flex table-row-items table-body-item">
                <td className="col-md-4">
                    <img alt="logo" className="mr-2" src={TeamService.getTeamLogo(team.market + " " + team.name)}
                        width={"40px"} />{team.name}
                </td>
                <td className="col-md-1">{team.wins}</td>
                <td className="col-md-1">{team.losses}</td>
                <td className="col-md-1">{team.ties}</td>
                <td className="col-md-1 win-pct">{team.win_pct}</td>
                <td className="col-md-1">{team.points_for}</td>
                <td className="col-md-1">{team.points_against}</td>
                <td className="col-md-1">{team.points_rank}</td>
                <td className="col-md-1">{team.touchdown_diff}</td>
            </tr>
        )
    };

    TableComponent = ({ division }) => {
        return (
            <table className="table table-borderless">
                <thead>
                    <tr className="d-flex table-row-items">
                        <th className="col-md-4" scope="col">{division.name}</th>
                        <th className="col-md-1" scope="col">W</th>
                        <th className="col-md-1" scope="col">L</th>
                        <th className="col-md-1" scope="col">T</th>
                        <th className="col-md-1" scope="col">.Pct</th>
                        <th className="col-md-1" scope="col">PF</th>
                        <th className="col-md-1" scope="col">PA</th>
                        <th className="col-md-1" scope="col">PR</th>
                        <th className="col-md-1" scope="col">TD</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        division.teams.map((team, index) => <this.TableBodyComponent key={index} team={team} />)
                    }
                </tbody>
            </table>
        )
    };

    componentDidMount() {
        setTimeout(() => {
            StandingService.getStandings()
                .then(standings => this.setState({
                    standings: standings
                }))
        }, 1000);
    }

    render() {
        return (
            <div>
                {
                    this.state.standings && this.state.standings.conferences && this.state.standings.conferences.length > 0
                    && this.state.standings.conferences.map(conference => {
                        return conference.divisions.map((division, index) =>
                            <this.TableComponent key={index} division={division} />
                        )
                    })
                }
            </div>
        );
    }
}

export default withRouter(StandingsBox);

