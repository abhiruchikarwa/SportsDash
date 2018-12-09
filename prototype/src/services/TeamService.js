import constants from '../constants/constants'

import arizona_cardinals from '../resources/images/team_logos/arizona_cardinals.png'
import atlanta_falcons from '../resources/images/team_logos/atlanta_falcons.png'
import baltimore_ravens from '../resources/images/team_logos/baltimore_ravens.png'
import buffalo_bills from '../resources/images/team_logos/buffalo_bills.png'
import carolina_panthers from '../resources/images/team_logos/carolina_panthers.png'
import chicago_bears from '../resources/images/team_logos/chicago_bears.png'
import cincinnati_bengals from '../resources/images/team_logos/cincinnati_bengals.png'
import cleveland_browns from '../resources/images/team_logos/cleveland_browns.png'
import dallas_cowboys from '../resources/images/team_logos/dallas_cowboys.png'
import denver_broncos from '../resources/images/team_logos/denver_broncos.png'
import detroit_lions from '../resources/images/team_logos/detroit_lions.png'
import green_bay_packers from '../resources/images/team_logos/green_bay_packers.png'
import houston_texans from '../resources/images/team_logos/houston_texans.png'
import indianapolis_colts from '../resources/images/team_logos/Indianapolis_colts.png'
import jacksonville_jaguars from '../resources/images/team_logos/jacksonville_jaguars.png'
import kansas_city_chiefs from '../resources/images/team_logos/kansas_city_chiefs.png'
import los_angele_chargers from '../resources/images/team_logos/los_angele_chargers.png'
import los_angeles_rams from '../resources/images/team_logos/los_angeles_rams.png'
import miami_dolphins from '../resources/images/team_logos/miami_dolphins.png'
import minnesota_vikings from '../resources/images/team_logos/minnesota_vikings.png'
import new_england_patriots from '../resources/images/team_logos/new_england_patriots.png'
import new_orleans_saints from '../resources/images/team_logos/new_orleans_saints.png'
import new_york_giants from '../resources/images/team_logos/new_york_giants.png'
import new_york_jets from '../resources/images/team_logos/new_york_jets.png'
import oakland_raiders from '../resources/images/team_logos/oakland_raiders.png'
import philadelphia_eagles from '../resources/images/team_logos/philadelphia_eagles.png'
import pittsburgh_steelers from '../resources/images/team_logos/pittsburgh_steelers.png'
import san_francisco_49ers from '../resources/images/team_logos/san_francisco_49ers.png'
import seattle_seahwaks from '../resources/images/team_logos/seattle_seahwaks.png'
import tampa_bay_buccaneers from '../resources/images/team_logos/tampa_bay_buccaneers.png'
import tennessee_titans from '../resources/images/team_logos/tennessee_titans.png'
import washington_redskins from '../resources/images/team_logos/washington_redskins.png'

export default class TeamService {

    static getTeamDetails = (teamId) => {
        return fetch(constants.BASE_URL + 'api/team/' + teamId + '/details/', {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static getFavoriteTeams = () => {
        return Promise.resolve([])
    };

    static getTeamLogo = (teamName) => {
        switch (teamName) {
            case 'Arizona Cardinals':
                return arizona_cardinals;
            case 'Atlanta Falcons':
                return atlanta_falcons;
            case 'Baltimore Ravens':
                return baltimore_ravens;
            case 'Buffalo Bills':
                return buffalo_bills
            case 'Cincinnati Bengals':
                return cincinnati_bengals;
            case 'Carolina Panthers':
                return carolina_panthers;
            case 'Cleveland Browns':
                return cleveland_browns;
            case 'Chicago Bears':
                return chicago_bears;
            case 'Detroit Lions':
                return detroit_lions;
            case 'Denver Broncos':
                return denver_broncos;
            case 'Dallas Cowboys':
                return dallas_cowboys;
            case 'Green Bay Packers':
                return green_bay_packers;
            case 'Houston Texans':
                return houston_texans;
            case 'Indianapolis Colts':
                return indianapolis_colts;
            case 'Jacksonville Jaguars':
                return jacksonville_jaguars;
            case 'Kansas City Chiefs':
                return kansas_city_chiefs;
            case 'Los Angeles Rams':
                return los_angeles_rams;
            case 'Los Angeles Chargers':
                return los_angele_chargers;
            case 'Miami Dolphins':
                return miami_dolphins;
            case 'Minnesota Vikings':
                return minnesota_vikings;
            case 'New York Jets':
                return new_york_jets;
            case 'New Orleans Saints':
                return new_orleans_saints;
            case 'New York Giants':
                return new_york_giants;
            case 'New England Patriots':
                return new_england_patriots;
            case 'Oakland Raiders':
                return oakland_raiders;
            case 'Pittsburgh Steelers':
                return pittsburgh_steelers;
            case 'Philadelphia Eagles':
                return philadelphia_eagles;
            case 'Seattle Seahawks':
                return seattle_seahwaks;
            case 'San Francisco 49ers':
                return san_francisco_49ers;
            case 'Tennessee Titans':
                return tennessee_titans;
            case 'Tampa Bay Buccaneers':
                return tampa_bay_buccaneers;
            case 'Washington Redskins':
                return washington_redskins;
            default:
                return ""
        }
    };
}