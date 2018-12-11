package localhostServer.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String type;
    private String email;
    private String playerApiId;

    @ManyToMany(mappedBy = "followers", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Player> following;

    @ManyToMany(mappedBy = "fans", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Team> favorites;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> commentsGiven;

    public List<Comment> getCommentsGiven() {
        return commentsGiven;
    }

    public void setCommentsGiven(List<Comment> commentsGiven) {
        this.commentsGiven = commentsGiven;
    }

    public Set<Team> getFavorites() {
        return favorites;
    }

    public void setFavorites(Set<Team> favorites) {
        this.favorites = favorites;
    }

    public void addFavorite(Team team) {
        this.favorites.add(team);
        if (!team.getFans().contains(this)) {
            team.getFans().add(this);
        }
    }

    public void removeFavorite(Team team) {
        team.getFans().remove(this);
        if (this.favorites.contains(team))
            this.favorites.remove(team);
    }

    public User() {
    }

    public User(String username, String password, String firstName, String lastName, String type, String email) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.email = email;
    }

    public User(String username, String password, String firstName, String lastName, String type, String email, String playerApiId) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.email = email;
        this.playerApiId = playerApiId;
    }

    public String getPlayerApiId() {
        return playerApiId;
    }

    public void setPlayerApiId(String playerApiId) {
        this.playerApiId = playerApiId;
    }

    public Set<Player> getFollowing() {
        return following;
    }

    public void setFollowing(Set<Player> following) {
        this.following = following;
    }

    public void addFollowing(Player player) {
        this.following.add(player);
        if (!player.getFollowers().contains(this)) {
            player.getFollowers().add(this);
        }
    }

    public void removeFollowing(Player player) {
        player.getFollowers().remove(this);
        if (this.following.contains(player)) {
            this.following.remove(player);
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
