import constants from '../constants/constants'

import arrowhead_stadium from '../resources/images/venue_images/arrowhead_stadium.jpg';
import atandt_stadium from '../resources/images/venue_images/atandt_stadium.jpg';
import bank_of_america_stadium from '../resources/images/venue_images/bank_of_america_stadium.jpg'
import broncos_stadium_mile_high from '../resources/images/venue_images/broncos_stadium_mile_high.jpg'
import centurylink_field from '../resources/images/venue_images/centurylink_field.jpg'
import fedex_field from '../resources/images/venue_images/fedex_field.jpg'
import first_energy_stadium from '../resources/images/venue_images/first_energy_stadium.jpg'
import ford_field from '../resources/images/venue_images/ford_field.jpg'
import gillette_stadium from '../resources/images/venue_images/gillette_stadium.jpg';
import hard_rock_stadium from '../resources/images/venue_images/hard_rock_stadium.jpg';
import heinz_field from '../resources/images/venue_images/heinz_field.jpg'
import lambeau_field from '../resources/images/venue_images/lambeau_field.jpg'
import levis_stadium from '../resources/images/venue_images/levis_stadium.jpg'
import lincoln_financial_field from '../resources/images/venue_images/lincoln_financial_field.jpg'
import los_angeles_memorial_coliseum from '../resources/images/venue_images/los_angeles_memorial_coliseum.jpg'
import lucas_oil_stadium from '../resources/images/venue_images/lucas_oil_stadium.jpg'
import mandt_bank_stadium from '../resources/images/venue_images/mandt_bank_stadium.jpg';
import mercedes_benz_stadium from '../resources/images/venue_images/mercedes_benz_stadium.jpg';
import mercedes_benz_superdome from '../resources/images/venue_images/mercedes_benz_superdome.jpg'
import metLife_stadium from '../resources/images/venue_images/metLife_stadium.jpg'
import new_era_field from '../resources/images/venue_images/new_era_field.jpg'
import nissan_stadium from '../resources/images/venue_images/nissan_stadium.jpg'
import nrg_stadium from '../resources/images/venue_images/nrg_stadium.jpg'
import oakland_alameda_coliseum from '../resources/images/venue_images/oakland_alameda_coliseum.jpg'
import paul_brown_stadium from '../resources/images/venue_images/paul_brown_stadium.jpg';
import raymond_james_stadium from '../resources/images/venue_images/raymond_james_stadium.jpg';
import soldier_field from '../resources/images/venue_images/soldier_field.jpg'
import state_farm_stadium from '../resources/images/venue_images/state_farm_stadium.jpg'
import stubhub_center from '../resources/images/venue_images/stubhub_center.jpg'
import tiaa_bank_field from '../resources/images/venue_images/tiaa_bank_field.jpg'
import us_bank_stadium from '../resources/images/venue_images/us_bank_stadium.jpg'

export default class VenueService {

    static getVenueDetails = (venueId) => {
        return fetch(constants.BASE_URL + 'api/venue/' + venueId, {
            method: 'GET',
            mode: "cors",
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(error => console.log(error));
    };

    static getVenueImage = (teamName) => {
        switch (teamName) {
            case 'Arrowhead Stadium':
                return arrowhead_stadium;
            case 'AT&T Stadium':
                return atandt_stadium;
            case 'Bank of America Stadium':
                return bank_of_america_stadium;
            case 'Broncos Stadium Mile High':
                return broncos_stadium_mile_high;
            case 'Centurylink Field':
                return centurylink_field;
            case 'FedEx Field':
                return fedex_field;
            case 'First Energy Stadium':
                return first_energy_stadium;
            case 'Ford Field':
                return ford_field;
            case 'Gilette Stadium':
                return gillette_stadium;
            case 'Hard Rock Stadium':
                return hard_rock_stadium;
            case 'Heinz Field':
                return heinz_field;
            case 'Lambeau Field':
                return lambeau_field;
            case 'Levis Stadium':
                return levis_stadium;
            case 'Lincoln Financial Field':
                return lincoln_financial_field;
            case 'Los Angeles Memorial Coliseum':
                return los_angeles_memorial_coliseum;
            case 'Lucas Oil Stadium':
                return lucas_oil_stadium;
            case 'M&T Bank Stadium':
                return mandt_bank_stadium;
            case 'Mercedes Benz Stadium':
                return mercedes_benz_stadium;
            case 'Mercedes Benz Superdome':
                return mercedes_benz_superdome;
            case 'MetLife Stadium':
                return metLife_stadium;
            case 'New Era Field':
                return new_era_field;
            case 'Nissan Stadium':
                return nissan_stadium;
            case 'NRG Stadium':
                return nrg_stadium;
            case 'Oakland Alameda Coliseum':
                return oakland_alameda_coliseum;
            case 'Paul Brown Stadium':
                return paul_brown_stadium;
            case 'Raymond James Stadium':
                return raymond_james_stadium;
            case 'Soldier Field':
                return soldier_field;
            case 'State Farm Stadium':
                return state_farm_stadium;
            case 'StubHub Center':
                return stubhub_center;
            case 'TIAA Bank Field':
                return tiaa_bank_field;
            case 'US Bank Stadium':
                return us_bank_stadium;
            default:
                return ""
        }
    };
}