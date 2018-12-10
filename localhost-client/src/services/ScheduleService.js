import constants from '../constants/constants'

export default class ScheduleService {
    static getSchedule = (weekNumber) => {
        return fetch(constants.BASE_URL + 'api/schedule/' + weekNumber, {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(schedule => schedule.week)
            .catch(error => console.log(error));
    }
}