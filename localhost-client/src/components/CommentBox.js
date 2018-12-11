import React, {Component} from 'react'
import '../styles/comment-box.styles.client.css'
import * as moment from 'moment'
import PlayerService from "../services/PlayerService";
import UserService from "../services/UserService";

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            comments: [],
            commentText: "",
            currentUser: user,
            currentPlayer: {
                id: 1,
                api_id: "sdaf",
                name: "Tom",
                commentsReceived: []
            }
        };
        this.handleCommentChange = this.handleCommentChange.bind(this)
    }

    componentDidMount() {
        this.fetchComments()
    }

    handleCommentChange = (event) => this.setState({
        commentText: event.target.value
    });

    fetchComments = () => {
        PlayerService.getCommentsForPlayer(this.state.currentPlayer.id)
            .then(comments => this.setState({
                comments: comments
            }));
        // UserService.getCommentsByUser(this.state.currentUser.id)
        //     .then(comments => this.setState({
        //         comments: comments
        //     }));
    };

    addComment = () => {
        let comment = {
            comment: this.state.commentText,
            commentDate: (new Date()).toISOString(),
            commentGiverName: this.state.currentUser.first_name + " " + this.state.currentUser.last_name,
            commentReceiverName: this.state.currentPlayer.name
        };
        UserService.addComment(this.state.currentUser.id, this.state.currentPlayer.id, comment)
            .then(comments => this.setState({
                comments: comments,
                commentText: ""
            }));
    };

    deleteComment = (commentId) => {
        UserService.deleteComment(commentId)
            .then(() => this.fetchComments())
    };

    render() {
        return (
            <div className="container comment-section">
                <div className="row">
                    <div className="card comment-card text-center">
                        <div className="card-header text-center heading-text">
                            Comment Sections
                        </div>
                        <div id="commentSection"
                             className="card-body justify-content-center align-items-center comment-section-body">
                            <ul className="list-group">
                                {
                                    this.state.comments && this.state.comments.map((singleComment, index) =>
                                        <li key={index} className="list-group-item row single-comment shadow">
                                            <div className="col-md-3 user-section">
                                                <i className="fas fa-3x fa-user user-font"/>
                                                <p className="comment-username">{singleComment.commentGiverName}</p>
                                                <p className="comment-time">{moment(singleComment.commentDate).format("ddd, M/D, h:mm a")}</p>
                                            </div>
                                            <div className="col-md-8 user-comment">
                                                <span className="comment-player-name">
                                                    {singleComment.commentReceiverName}
                                                </span>
                                                <p>
                                                    {singleComment.comment}
                                                </p>
                                                <i onClick={() => this.deleteComment(singleComment.id)}
                                                   className="fas fa-trash float-right delete-button"/>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-11">
                                    <input onChange={this.handleCommentChange}
                                           value={this.state.commentText}
                                           disabled={!this.state.currentUser}
                                           className="form-control" type="text"
                                           placeholder="Write your comments here"/>
                                </div>
                                <div className="col-md-1 p-0">
                                    <button onClick={() => this.addComment()}
                                            disabled={!this.state.currentUser}
                                            className="comment-button">Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}