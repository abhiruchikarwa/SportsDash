package prototype.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import prototype.server.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    @Query("SELECT user from User user WHERE user.username=:username AND user.password=:password")
    public User findPersonByCredentials(
            @Param("username") String username,
            @Param("password") String password);

    @Query("SELECT user from User user WHERE user.username=:username")
    public User findPersonByUsername(
            @Param("username") String username);
}
