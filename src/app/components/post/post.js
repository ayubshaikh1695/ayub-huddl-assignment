import React from 'react';
import './post.css';
import { fetchUserById, fetchPostById, fetchCommentsByPostId } from '../../services/api-service';
import Spinner from '../../shared/spinner/spinner';
import queryString from 'query-string';
import axios from 'axios';

class Post extends React.Component {
  signal = axios.CancelToken.source();
  abortSignal = { cancelToken: this.signal.token };

  constructor(props) {
    super(props);
    this.state = { postInfo: null };
  }

  componentDidMount() {
    const queryValues = queryString.parse(this.props.location.search);
    const userId = queryValues.userId;
    const postId = queryValues.postId;

    fetchUserById(userId, this.abortSignal).then(res => {
      const user = res.data;

      fetchPostById(postId, this.abortSignal).then(res => {
        const post = res.data;

        fetchCommentsByPostId(postId, this.abortSignal).then(res => {
          const comments = res.data;

          const data = {
            username: user.username,
            title: post.title,
            comments: comments
          }
          this.setState({ postInfo: data });
        }).catch(err => {
          if (axios.isCancel(err)) {
            console.log('Error: ', err.message);
          }
        });
      }).catch(err => {
        if (axios.isCancel(err)) {
          console.log('Error: ', err.message);
        }
      });
    }).catch(err => {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message);
      }
    });
  }

  getUsername(users, userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i].username;
      }
    }
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  render() {
    const { postInfo } = this.state;
    return (
      <div className="posts-wrapper">
        {postInfo ?
          <div className="post-container">
            <div className="post-detail mb-24 flex align-center">
              <div className="mr-12">
                <i className="fas fa-user-circle user-icon"></i>
              </div>
              <div>
                <div className="pri-txt fw-600 mb-4">{postInfo.title ? postInfo.title : "N/A"}</div>
                <div className="sec-txt user-name">{postInfo.username ? postInfo.username : "N/A"}</div>
              </div>
            </div>
            {postInfo.comments && postInfo.comments.length > 0 ?
              <ul className="comments-container">
                {postInfo.comments.map((comment, i) => {
                  return <li key={i} className="comment-list mb-16">
                    <div className="mb-8">
                      <div className="pri-txt">{comment.name ? comment.name : "N/A"}</div>
                      <div className="sec-txt">{comment.email ? comment.email : "N/A"}</div>
                    </div>
                    <div className="sec-txt">{comment.body ? comment.body : "N/A"}</div>
                  </li>
                })}
              </ul> : <div className="sec-txt">No comments available</div>
            }
          </div>
          : <Spinner />}
      </div>
    );
  }
}

export default Post;
