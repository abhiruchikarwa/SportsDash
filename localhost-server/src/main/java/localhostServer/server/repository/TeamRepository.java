package localhostServer.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import localhostServer.server.models.Team;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Integer> {

    @Query(value = "SELECT * FROM Team team WHERE team.name LIKE CONCAT('%',:filterString,'%')", nativeQuery = true)
    List<Team> findMatchingTeams
            (@Param("filterString") String filterString);

    @Query("SELECT team FROM Team team WHERE team.api_id=:api_id")
    Team findTeamByApiId
            (@Param("api_id") String api_id);
}
