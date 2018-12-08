package com.example.localhost_login.models;

public class Fans extends User {
    public Fans(){}

    public Fans(String username, String password, String firstName, String lastName, String email){
        super(username,password,firstName,lastName,email);
        setType("FANS");
    }
}
