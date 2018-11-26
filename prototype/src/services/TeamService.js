import api from '../constants/constants'
import league from './league'
import team from './team'

export default class TeamService {
    static getTeams = () => {
        return Promise.resolve(league)
            .then(leagueInfo => {
                var teams = [];
                const conferences = leagueInfo.conferences;
                conferences.forEach(conference => {
                    const divisions = conference.divisions;
                    divisions.forEach(div => {
                        teams = teams.concat(div.teams);
                    });
                });
                return Promise.resolve(teams);
            });

        // fetch(api.BASE_URL + 'league/hierarchy.json?' + api.API_KEY, {
        //   method: 'GET',
        //   credentials: 'include',
        // })
        //   .then(res => console.log(res))
        //   .catch(error => console.log(error))

    };

    static getTeamDetails = (teamId) => {
        return Promise.resolve(team);
    }
}