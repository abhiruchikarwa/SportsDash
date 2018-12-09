import constants from '../constants/constants'

export default class UserService {

    static getFollowingPlayers = (userId) => {
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/following', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static getFavoriteTeams = (userId) => {
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/favorite', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    }
}