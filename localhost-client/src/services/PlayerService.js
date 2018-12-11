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
    };

    static getPlayerByApiId = (api_id) => {
        return fetch(constants.BASE_URL + 'api/player/' + api_id + '/api_id/', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static getCommentsForPlayer = (playerId) => {
        return fetch(constants.BASE_URL + 'api/player/' + playerId + '/comment', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static getPlayerById = (playerId) => {
        return fetch(constants.BASE_URL + 'api/player/' + playerId , {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    }
}