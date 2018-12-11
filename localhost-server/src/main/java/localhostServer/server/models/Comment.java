package localhostServer.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String comment;
    private Date commentDate;
    private String commentGiverName;
    private String commentReceiverName;

    @ManyToOne
    @JsonIgnore
    private Player player;

    @ManyToOne
    @JsonIgnore
    private User user;

    public Comment() {
    }

    public Comment(String comment, Player player, User user) {
        this.comment = comment;
        this.player = player;
        this.user = user;
    }

    public Comment(String comment, Date commentDate, String commentGiverName, String commentReceiverName, Player player, User user) {
        this.comment = comment;
        this.commentDate = commentDate;
        this.commentGiverName = commentGiverName;
        this.commentReceiverName = commentReceiverName;
        this.player = player;
        this.user = user;
    }


    public String getCommentGiverName() {
        return commentGiverName;
    }

    public void setCommentGiverName(String commentGiverName) {
        this.commentGiverName = commentGiverName;
    }

    public String getCommentReceiverName() {
        return commentReceiverName;
    }

    public void setCommentReceiverName(String commentReceiverName) {
        this.commentReceiverName = commentReceiverName;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
