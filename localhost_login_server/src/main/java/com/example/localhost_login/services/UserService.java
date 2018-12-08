package com.example.localhost_login.services;

import com.example.localhost_login.models.User;
import com.example.localhost_login.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "*")
public class UserService {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/api/register")
    public User register(
            @RequestBody User user,
            HttpSession session) {
        session.setAttribute("currentUser", user);
        //users.add(user);
        return user;
    }

    @GetMapping("/api/profile")
    public User profile(HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        return currentUser;
    }

    @PostMapping("/api/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @PostMapping("/api/login")
    public User login(
            @RequestBody User credentials,
            HttpSession session) {
        User user = userRepository.findPersonByCredentials(credentials.getUsername(),credentials.getPassword());
        if(user!=null){
            session.setAttribute("currentUser", user);
            return user;
        }
        return null;
    }
}
