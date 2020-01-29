import React from 'react';
import './post.css';
import { fetchUserById, fetchPostById, fetchCommentsByPostId } from '../../services/api-service';
import Spinner from '../../shared/spinner/spinner';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postInfo: null };
  }

  componentDidMount() {
    const userId = 1;
    const postId = 1;
    console.log(this.props);

    fetchUserById(userId).then(res => {
      const user = res.data;

      fetchPostById(postId).then(res => {
        const post = res.data;

        fetchCommentsByPostId(postId).then(res => {
          const comments = res.data;

          const data = {
            username: user.username,
            title: post.title,
            comments: comments
          }
          this.setState({ postInfo: data });

        }).catch(err => { });
      }).catch(err => { });
    }).catch(err => { });
  }

  getUsername(users, userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i].username;
      }
    }
  }

  render() {
    const { postInfo } = this.state;
    console.log(this.props);
    return (
      <div className="posts-wrapper">
        {postInfo ?
          <div className="post-container">
            <div className="mr-12">
              <i className="fas fa-user-circle user-icon"></i>
            </div>
            <div>
              <div className="pri-txt mb-4">{postInfo.title ? postInfo.title : "N/A"}</div>
              <div className="sec-txt user-name">{postInfo.username ? postInfo.username : "N/A"}</div>
            </div>
            {postInfo.comments && postInfo.comments.length > 0 ?
              <ul className="comments-container">
                {postInfo.comments.map((comment, i) => {
                  return <li key={i} className="comment-list">
                    <div className="mb-4">
                      <div className="pri-txt">{comment.name ? comment.name : "N/A"}</div>
                      <div className="sec-txt user-name">{comment.email ? comment.email : "N/A"}</div>
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
