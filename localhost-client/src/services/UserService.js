import constants from "../constants/constants";

export default class UserService {

  static login = (user) =>
    fetch(constants.BASE_URL + 'api/login', {
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
      mode: "cors",
      credentials: "include",
      method: 'POST'
    })
      .then(response => response.json())
      .catch(error => null);


  static logout = () =>
    fetch(constants.BASE_URL + 'api/logout', {
      headers: { 'Content-Type': 'application/json' },
      mode: "cors",
      credentials: "include",
      method: 'POST'
    })
      .then(response => response)
      .catch(error => console.log(error));


  static register = (user) =>
    fetch(constants.BASE_URL + 'api/register', {
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
      mode: "cors",
      credentials: "include",
      method: 'POST'
    })
      .then(response => response.json())
      .catch(error => null);


  static getUserDetails = (userId) =>
    fetch(constants.BASE_URL + 'api/user/' + userId, {
      method: 'GET',
      mode: "cors",
      credentials: "include",
    })
      .then(response => response.json())
      .catch(error => null);


  static updateUser = (user) =>
    fetch(constants.BASE_URL + 'api/user/update', {
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      mode: "cors",
      credentials: "include",
    })
      .then(user => user.json())
      .catch(error => console.log(error));


  static getFollowingPlayers = (userId) => {
    return fetch(constants.BASE_URL + 'api/user/' + userId + '/following', {
      method: 'GET',
      mode: "cors",
      credentials: 'include'
    })
      .then(res => res.json())
      .catch(error => error);
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