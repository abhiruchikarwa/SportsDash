import constants from '../constants/constants'
import favoriteData from './favorites'

export default class SearchService {
  static getSearchResults = (filter, term) => {
    let searchData = JSON.parse(JSON.stringify(favoriteData));
    let searchArray = [];
    switch (filter.toLowerCase()) {
      case "teams":
        searchArray = searchData.teams;
        break;
      case "players":
        searchArray = searchData.players;
        break;
      case "venues":
        searchArray = searchData.venues;
        break;
      default:
        searchArray = []
    }
    if (searchArray.length > 0) {
      let searchResults = searchArray.filter(element => element.name.toLowerCase().includes(term.toLocaleString())).splice(0);
      return Promise.resolve(searchResults);
    }
    return Promise.resolve([]);
  };

}