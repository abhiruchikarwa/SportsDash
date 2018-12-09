package prototype.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String api_id;
    private String name;

    @ManyToMany
    @JoinTable(name = "FOLLOWING",
            joinColumns = @JoinColumn(name = "PLAYER_ID",
                    referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name =
                    "USER_ID", referencedColumnName = "ID"))
    @JsonIgnore
    private Set<User> followers;

    @ManyToMany
    @JoinTable(name = "COMMENT",
            joinColumns = @JoinColumn(name = "PLAYER_ID",
                    referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name =
                    "USER_ID", referencedColumnName = "ID"))
    @JsonIgnore
    private Set<User> commentGivers;

    public Set<User> getCommentGivers() {
        return commentGivers;
    }

    public void setCommentGivers(Set<User> commentGivers) {
        this.commentGivers = commentGivers;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public Player() {
    }

    public Player(String api_id, String name) {
        this.api_id = api_id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getApi_id() {
        return api_id;
    }

    public void setApi_id(String api_id) {
        this.api_id = api_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
