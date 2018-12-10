import constants from '../constants/constants'

export default class PlayerService {

    static getPlayerDetails = (playerId) => {
        return fetch(constants.BASE_URL + 'api/player/' + playerId + '/details/', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    }
}