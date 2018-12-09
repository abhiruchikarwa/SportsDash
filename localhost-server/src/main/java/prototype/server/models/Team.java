package prototype.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String api_id;
    private String name;

    @ManyToMany
    @JoinTable(name = "FAVORITE",
            joinColumns = @JoinColumn(name = "TEAM_ID",
                    referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name =
                    "USER_ID", referencedColumnName = "ID"))
    @JsonIgnore
    private Set<User> fans;

    public Set<User> getFans() {
        return fans;
    }

    public void setFans(Set<User> fans) {
        this.fans = fans;
    }

    public Team() {
    }

    public Team(String api_id, String name) {
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
