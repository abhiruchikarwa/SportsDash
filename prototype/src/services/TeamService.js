import constants from '../constants/constants'

export default class TeamService {
    static getTeams = () => fetch(constants.BASE_URL + 'api/team', {
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

    static getTeamDetails = (teamId) => fetch(constants.BASE_URL + 'api/team/' + teamId, {
        method: 'GET',
        mode: "cors",
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(error => console.log(error));

}