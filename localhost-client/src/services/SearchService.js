import constants from '../constants/constants'

export default class SearchService {
    static filterTeams = (term) => {
        return fetch(constants.BASE_URL + 'api/team?filter=' + term, {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(() => []);
    };

    static filterPlayers = (term) => {
        return fetch(constants.BASE_URL + 'api/player?filter=' + term, {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(() => []);
    };

    static filterVenues = (term) => {
        return fetch(constants.BASE_URL + 'api/venue?filter=' + term, {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(() => []);
    };

    static getSearchResults = (filter, term) => {
        switch (filter.toLowerCase()) {
            case "teams":
                return SearchService.filterTeams(term);
            case "players":
                return SearchService.filterPlayers(term);
            case "venues":
                return SearchService.filterVenues(term);
            default:
                return Promise.resolve([]);
        }
    };
}