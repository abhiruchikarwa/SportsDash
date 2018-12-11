import constants from "../constants/constants";

export default class UserService {

    static login = (user) =>
        fetch(constants.BASE_URL + '/login', {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(response => response.json())
            .catch(error => {
                alert("Wrong Username and Password")
                return Promise.reject("Wrong Username and Password")
            });

    static register = (user) =>
        fetch(constants.BASE_URL + '/register', {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(response => response.json())
            .catch(error => {
                alert("Username exist")
                return Promise.reject("Username exist")
            });

    static getInfo = (userId) =>
        fetch(constants.BASE_URL + '/' + userId, {
            method: 'GET'
        }).then(response => response.json())
            .catch(error => {
                alert("No Such User")
                return Promise.reject("No Such User")
            });

    static updateUser = (user) =>
        fetch(constants.BASE_URL + '/update', {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'PUT'
        }).catch(error => {
            alert("Update Fail")
            return Promise.reject("Username exist")
        });

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
        return fetch(constants.BASE_URL + 'api/user/' + userId + '/following/' + teamId, {
            method: 'DELETE',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static comments = [{id: 1,}];

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