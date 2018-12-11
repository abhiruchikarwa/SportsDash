const teamData = require('./team.json');
const _ = require('lodash');
const fetch = require('node-fetch');

class seedPlayerData {

  postData(url = ``, data = {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json());
  }

  seedPlayerTable() {
    _.map(teamData, team => {
      const insertPlayers = [];
      const { players } = team;
      _.map(players, player => {
        insertPlayers.push({
          api_id: player.id,
          name: player.name,
        });
      });
      this.postData('http://localhost:8080/api/player/bulk', { playerList: insertPlayers })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => console.log(err));
    })
  }
}

const seedPlayers = new seedPlayerData();
seedPlayers.seedPlayerTable();