import constants from '../constants/constants'

export default class GameService {

    static getGameDetails = (gameId) => {
        return fetch(constants.BASE_URL + 'api/game/' + gameId, {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    }
}