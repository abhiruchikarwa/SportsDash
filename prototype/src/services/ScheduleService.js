import constants from '../constants/constants'

export default class ScheduleService {
  static getSchedule = () => {
    return fetch(constants.BASE_URL + 'api/schedule', {
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
  }
}