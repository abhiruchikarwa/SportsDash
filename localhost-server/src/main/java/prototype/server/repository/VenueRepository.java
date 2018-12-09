package prototype.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import prototype.server.models.Venue;

import java.util.List;

public interface VenueRepository extends CrudRepository<Venue, Integer> {

    @Query(value = "SELECT * FROM Venue venue WHERE venue.name LIKE CONCAT('%',:filterString,'%')", nativeQuery = true)
    List<Venue> findMatchingVenues
            (@Param("filterString") String filterString);
}
