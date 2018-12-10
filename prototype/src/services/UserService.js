import constants from '../constants/constants'
import UserData from './users'

export default class UserService {

    static login = (user) => {
        for (var u in UserData) {
            if (UserData[u].username === user.username && UserData[u].password === user.password) {
                return UserData[u].id
            }
        }
        return "No match"
    }

    static register = (user) => {
        for (var u in UserData) {
            if (UserData[u].username === user.username) {
                return "Username already exist"
            }
        }
        if(user.playerId!="FAN"){
            user.team = {}
            user.seasons = []
        }
        UserData.push(user)
        return user.id
    }

    static getInfo = (userId) =>
        UserData.find((user) => user.id==userId)

    static updateUser = (userId, user) => {
        for (var u in UserData) {
            if (UserData[u].id === user.id) {
                UserData[u].password = user.password
                UserData[u].firstName = user.firstName
                UserData[u].lastName = user.lastName
                UserData[u].email = user.email
            }
        }
    }

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