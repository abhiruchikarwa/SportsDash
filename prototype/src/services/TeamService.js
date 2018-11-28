import api from '../constants/constants'
import league from './league'
import team from './team'

export default class TeamService {
    static getTeams = () => fetch("http://localhost:8080/api/team", {
        method: 'GET',
        mode: "cors",
        credentials: 'include'
    })
        .then(res => res.json())
        .then(leagueInfo => {
            let teams = [];
            const conferences = leagueInfo.conferences;
            conferences.forEach(conference => {
                const divisions = conference.divisions;
                divisions.forEach(div => {
                    teams = teams.concat(div.teams);
                });
            });
            return teams;
        })
        .catch(error => console.log(error));

    static getTeamDetails = (teamId) => fetch("http://localhost:8080/api/team/" + teamId, {
        method: 'GET',
        mode: "cors",
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(error => console.log(error));

}