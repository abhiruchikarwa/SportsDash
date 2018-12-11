package localhostServer.server.services;

import localhostServer.server.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import localhostServer.server.models.Venue;
import localhostServer.server.models.VenueWrapper;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class VenueService {

    @Autowired
    VenueRepository venueRepository;

    @GetMapping("/api/venue/")
    public List<Venue> findAllVenues() {
        return (List<Venue>) venueRepository.findAll();
    }

    @GetMapping("/api/venue/{venueId}")
    public Venue findVenueById(@PathVariable("venueId") int venueId) {
        return venueRepository.findById(venueId).orElse(null);
    }

    @GetMapping("/api/venue")
    public List<Venue> findMatchingVenues(@RequestParam("filter") String filterString) {
        return venueRepository.findMatchingVenues(filterString);
    }

    @PostMapping("/api/venue")
    public List<Venue> createVenue(@RequestBody Venue venue) {
        venueRepository.save(venue);
        return (List<Venue>) venueRepository.findAll();
    }

    @PostMapping("/api/venue/bulk")
    public List<Venue> bulkCreateVenues(@RequestBody VenueWrapper players) {
        venueRepository.saveAll(players.getVenueList());
        return (List<Venue>) venueRepository.findAll();
    }

    @DeleteMapping("/api/venue/{venueId}")
    public void deleteVenue(@PathVariable("venueId") int venueId) {
        venueRepository.deleteById(venueId);
    }

    @DeleteMapping("/api/venue")
    public void deleteAllVenues() {
        venueRepository.deleteAll();
    }

    @GetMapping("/api/venue/{venueId}/details")
    public Venue getVenueDetails(@PathVariable("venueId") String venueId) {
        return venueRepository.findVenueByApiId(venueId).get(0);
    }
}
