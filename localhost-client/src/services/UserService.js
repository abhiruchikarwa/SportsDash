import UserData from './users'
import constants from "../constants/constants";
const USER_API = 'http://localhost:8080/api/user'

export default class UserService {

    static login = (user) =>
        fetch(USER_API + '/login', {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(response => response.json())
            .catch(error => {
                alert("Wrong Username and Password")
                return Promise.reject("Wrong Username and Password")
            })

    static register = (user) =>
        fetch(USER_API + '/register', {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(response => response.json())
            .catch(error => {
                alert("Username exist")
                return Promise.reject("Username exist")
            })

    static getInfo = (userId) =>
        fetch(USER_API + '/' +userId, {
            method: 'GET'
        }).then(response => response.json())
            .catch(error => {
                alert("No Such User")
                return Promise.reject("No Such User")
            })

    static updateUser = (user) =>
        fetch(USER_API + '/update', {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'PUT'
        }).catch(error => {
                alert("Update Fail")
                return Promise.reject("Username exist")
            })

    static getFollowingPlayers = (userId) => {
        return fetch(USER_API + '/' + userId + '/following', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static getFavoriteTeams = (userId) => {
        return fetch(USER_API + '/' + userId + '/favorite', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    }
}