import React, {Component} from 'react'
import '../styles/comment-box.styles.client.css'
import * as moment from 'moment'
import PlayerService from "../services/PlayerService";
import UserService from "../services/UserService";
import _ from "lodash";

export default class CommentBoxForPlayer extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            comments: [],
            commentText: "",
            currentUser: user,
            currentPlayer: {},
            userName: user ? user.firstName + " " + user.lastName : ""
        };
        this.handleCommentChange = this.handleCommentChange.bind(this)
    }

    componentDidMount() {
        if (this.props.playerId) {
            this.fetchCommentsForPlayer();
        }
    }

    fetchCommentsForPlayer = () =>
        PlayerService.getPlayerByApiId(this.props.playerId)
            .then(player => this.setState({
                currentPlayer: player,
                comments: player ? player.commentsReceived : []
            }));

    handleCommentChange = (event) => this.setState({
        commentText: event.target.value
    });

    addComment = () => {
        let comment = {
            comment: this.state.commentText,
            commentDate: (new Date()).toISOString(),
            commentGiverName: this.state.userName,
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
            .then(() => this.fetchCommentsForPlayer())
    };

    render() {
        return (
            <div className="container comment-section">
                <div className="row">
                    <div className="card comment-card text-center">
                        {this.props.parentProps && _.includes(this.props.parentProps.location.pathname, "profile") ?
                            <div className="card-header text-center heading-text">
                                <span>Comments For {this.state.userName} ( a.k.a {this.state.currentPlayer.name} )</span>
                            </div> :
                            <div className="card-header text-center heading-text">
                                {
                                    this.state.currentPlayer ?
                                        <span>Comments For {this.state.currentPlayer.name} </span>
                                        : <span>Comments Section  </span>
                                }
                            </div>
                        }
                        <div id="commentSection"
                             className="card-body justify-content-center align-items-center comment-section-body">
                            <ul className="list-group">
                                {
                                    this.state.comments && this.state.comments.length > 0 ?
                                        this.state.comments.map((singleComment, index) =>
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

                                                    {
                                                        this.state.userName === singleComment.commentGiverName &&
                                                        <i onClick={() => this.deleteComment(singleComment.id)}
                                                           className="fas fa-trash float-right delete-button"/>
                                                    }
                                                </div>
                                            </li>
                                        )
                                        : this.state.comments && this.state.comments.length === 0 &&
                                        <div className="no-comments">
                                            This player does not have any comments yet!
                                        </div>
                                }
                            </ul>
                        </div>
                        { this.props.parentProps && _.includes(this.props.parentProps.location.pathname, "profile") ? <div/> :
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
                        }
                    </div>
                </div>
            </div>
        )
    }
}