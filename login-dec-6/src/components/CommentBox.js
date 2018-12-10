import React from 'react'
import '../styles/comment-box.styles.client.css'
import * as moment from 'moment'

const CommentBox = () => {
    return (
            <div className="card text-center">
                <div className="card-header text-center heading-text">
                    Comment Sections
                </div>
                <div className="card-body justify-content-center align-items-center comment-section-body">
                    <ul className="list-group">
                        {
                            [...Array(10).keys()].map(n =>
                                <li key={n} className="list-group-item row single-comment shadow">
                                    <div className="col-md-3 user-section">
                                        <i className="fa fa-3x fa-user user-font"/>
                                        <p className="comment-username">UserName</p>
                                        <p className="comment-time">{moment(new Date()).format("ddd, M/D, h:mm a")}</p>
                                    </div>
                                    <div className="col-md-9 user-comment">
                                        <p>
                                            This is a random comment about a random team playing a random match with
                                            random players on a random field, with random fans spectating the sport from
                                            random corners of the stadium
                                        </p>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-11">
                            <input className="form-control" type="text" placeholder="Write your comments here"/>
                        </div>
                        <div className="col-md-1 p-0">
                            <button className="comment-button">Send</button>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export default CommentBox;