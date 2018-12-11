package localhostServer.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import localhostServer.server.models.Venue;

import java.util.List;

public interface VenueRepository extends CrudRepository<Venue, Integer> {

    @Query(value = "SELECT * FROM Venue venue WHERE venue.name LIKE CONCAT('%',:filterString,'%')", nativeQuery = true)
    List<Venue> findMatchingVenues(@Param("filterString") String filterString);

    @Query("SELECT venue FROM Venue venue WHERE venue.api_id=:venueApiId")
    List<Venue> findVenueByApiId(@Param("venueApiId") String venueApiId);
}
