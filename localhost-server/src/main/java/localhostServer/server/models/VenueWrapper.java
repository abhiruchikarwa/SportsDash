package localhostServer.server.models;

import java.util.List;


public class VenueWrapper {

    List<Venue> venueList;

    public VenueWrapper() {
    }

    public VenueWrapper(List<Venue> venueList) {
        this.venueList = venueList;
    }

    public List<Venue> getVenueList() {
        return venueList;
    }

    public void setVenueList(List<Venue> venueList) {
        this.venueList = venueList;
    }
}
