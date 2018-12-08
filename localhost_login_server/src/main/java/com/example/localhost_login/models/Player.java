package com.example.localhost_login.models;

public class Player extends User{
    private String playerId;

    public Player(){}

    public Player(String playerId, String username, String password, String firstName, String lastName, String email){
        if(true) {//This playerId is a valid Id
            setUsername(username);
            setPassword(password);
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setPlayerId(playerId);
            setType("PLAYER");
        }else
            throw (new Error("We cant find this player"));
    }

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }
}
