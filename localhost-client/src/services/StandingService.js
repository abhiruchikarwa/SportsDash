import constants from '../constants/constants'

export default class StandingService {

    static weekNumber = 14;
    static getStandings = () => {
        return fetch(constants.BASE_URL + 'api/standings', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(standings => {
                StandingService.weekNumber = standings.week.sequence;
                return standings
            })
            .catch(error => console.log(error));
    };
}