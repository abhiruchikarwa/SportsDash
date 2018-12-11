import constants from "../constants/constants";

export default class UserService {

    static login = (user) =>
        fetch(constants.BASE_URL + 'api/login', {
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then(response => response.json());

    static register = (user) =>
        fetch(constants.BASE_URL + 'api/register', {
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then(response => response.json());

    static getUserDetails = (userId) =>
        fetch(constants.BASE_URL + 'api/user/' + userId, {
            method: 'GET'
        })
            .then(response => response.json());

    static updateUser = (user) =>
        fetch(constants.BASE_URL + '/user/update', {
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT'
        })
            .then(user => user.json());

    static getFollowingPlayers = (userId) => {
        return fetch(constants.BASE_URL + '/' + userId + '/following', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static addFollowingPlayer = (userId, playerId) => {
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/following/' + playerId, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static removeFollowingPlayer = (userId, playerId) => {
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/following/' + playerId, {
            method: 'DELETE',
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
    };

    static addFavoriteTeam = (userId, teamId) => {
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/favorite/' + teamId, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static removeFavoriteTeam = (userId, teamId) => {
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/favorite/' + teamId, {
            method: 'DELETE',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static addComment = (userId, playerId, comment) => {
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/comment/' + playerId, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(comment),
        })
            .then(res => res.json())
            .catch(error => console.log(error))
    };

    static deleteComment = (commentId) => {
        return fetch(constants.BASE_URL + 'api/comment/' + commentId, {
            method: 'DELETE',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static getCommentsByUser = (userId) => {
        return fetch(constants.BASE_URL + '/api/user/' + userId + '/comment', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    }
}