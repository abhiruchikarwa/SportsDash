import React, {Component} from 'react'
import '../styles/comment-box.styles.client.css'
import * as moment from 'moment'
import UserService from "../services/UserService";

export default class CommentBoxForUser extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.state = {
            comments: [],
            commentText: "",
            currentUser: user,
            userName: this.props.user.firstName + " " + this.props.user.lastName
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
        UserService.getCommentsByUser(this.props.userId)
            .then(comments => this.setState({
                comments: comments
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
                            Comments By {this.state.userName}
                        </div>
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
                                            </li>)
                                        : this.state.comments && this.state.comments.length === 0 &&
                                        <div className="no-comments">
                                            This player does not have any comments yet!
                                        </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}