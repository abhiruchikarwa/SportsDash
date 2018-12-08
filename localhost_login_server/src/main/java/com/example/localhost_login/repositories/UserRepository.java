package com.example.localhost_login.repositories;

import com.example.localhost_login.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Integer> {

    @Query("SELECT person from Person person WHERE person.username=:username AND person.password=:password")
    public User findPersonByCredentials(
            @Param("username") String username,
            @Param("password") String password);
}
