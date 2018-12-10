package prototype.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import prototype.server.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {

    @Query("SELECT person from Person person WHERE person.username=:username AND person.password=:password")
    public User findPersonByCredentials(
            @Param("username") String username,
            @Param("password") String password);
}
