package prototype.server.repository;

import org.springframework.data.repository.CrudRepository;
import prototype.server.models.Comment;

public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
