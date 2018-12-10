package prototype.server.repository;

import org.springframework.data.repository.CrudRepository;
import prototype.server.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {
}
