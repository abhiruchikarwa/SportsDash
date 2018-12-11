package localhostServer.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import localhostServer.server.models.User;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Integer> {
  @Query("SELECT user from User user WHERE user.username=:username AND user.password=:password")
  public User findPersonByCredentials(@Param("username") String username, @Param("password") String password);

  @Query("SELECT user from User user WHERE user.username=:username")
  public User findPersonByUsername(@Param("username") String username);

  @Query("SELECT user from User user WHERE user.playerApiId=:playerApiId")
  public User findPersonByPlayerId(
          @Param("playerApiId") String playerApiId);
}
