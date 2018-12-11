const league = require('./league.json');
const _ = require('lodash');
const fetch = require('node-fetch');

class seedData {

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

  seedTables() {
    const insertVenues = [];
    const insertTeams = [];
    const { conferences } = league;
    _.map(conferences, conference => {
      const { divisions } = conference;
      _.map(divisions, division => {
        const { teams } = division;
        _.map(teams, team => {
          insertTeams.push({
            api_id: team.id,
            name: team.market + ' ' + team.name,
          });
          const { venue } = team;
          const { address, id, capacity, city, country, name, roof_type, state, surface, zip, } = venue;
          const value = {
            address,
            api_id: id,
            capacity,
            city,
            country,
            name,
            roofType: roof_type,
            state,
            surface,
            zip,
          }
          insertVenues.push(value);
        });
      });
    });
    this.postData('https://localhost-server-fall-2018.herokuapp.com/api/venue/bulk', { venueList: insertVenues })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    this.postData('https://localhost-server-fall-2018.herokuapp.com/api/team/bulk', { teamList: insertTeams })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

  }
}

const objseed = new seedData();
objseed.seedTables();