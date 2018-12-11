package localhostServer.server.repository;

import localhostServer.server.models.Team;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import localhostServer.server.models.Player;

import java.util.List;

public interface PlayerRepository extends CrudRepository<Player, Integer> {

    @Query(value = "SELECT * FROM Player player WHERE player.name LIKE CONCAT('%',:filterString,'%')", nativeQuery = true)
    List<Player> findMatchingPlayers
            (@Param("filterString") String filterString);

    @Query("SELECT player FROM Player player WHERE player.api_id=:api_id")
    Player findPlayerByApiId
            (@Param("api_id") String api_id);
}
