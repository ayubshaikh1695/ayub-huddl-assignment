import React from 'react';
import './all-posts.css';
import { fetchUsers, fetchPosts } from '../../services/api-service';
import Spinner from '../../shared/spinner/spinner';
import axios from 'axios';

class AllPosts extends React.Component {
  signal = axios.CancelToken.source();
  abortSignal = { cancelToken: this.signal.token };

  constructor(props) {
    super(props);
    this.state = { posts: null };
  }

  componentDidMount() {
    fetchUsers(this.abortSignal).then(res => {
      const users = res.data;
      fetchPosts(this.abortSignal).then(res => {
        const posts = res.data;
        const postsList = posts.map(post => {
          return {
            title: post.title,
            postId: post.id,
            userData: this.getUserData(users, post.userId)
          }
        })
        this.setState({ posts: postsList });
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

  getUserData(users, userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return {
          username: users[i].username,
          userId: users[i].id
        };
      }
    }
  }

  navigateToPostRoute(userId, postId) {
    this.props.history.push(`/post?userId=${userId}&postId=${postId}`);
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="all-posts-wrapper">
        {posts ? <ul className="posts-container">
          {posts.map((post, i) => {
            return <li key={i} className="post-list" onClick={() => this.navigateToPostRoute(post.userData.userId, post.postId)}>
              <div className="mr-12">
                <i className="fas fa-user-circle user-icon"></i>
              </div>
              <div>
                <div className="pri-txt mb-4">{post.title ? post.title : "N/A"}</div>
                <div className="sec-txt user-name">{post.userData.username ? post.userData.username : "N/A"}</div>
              </div>
            </li>
          })}</ul> : <Spinner />}
      </div>
    );
  }
}

export default AllPosts;
