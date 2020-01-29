import React from 'react';
import './all-posts.css';
import { fetchUsers, fetchPosts } from '../../services/api-service';
import Spinner from '../../shared/spinner/spinner';

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: null };
  }

  componentDidMount() {
    fetchUsers().then(res => {
      const users = res.data;
      fetchPosts().then(res => {
        const posts = res.data;
        const postsList = posts.map(post => {
          return {
            title: post.title,
            username: this.getUsername(users, post.userId)
          }
        })
        this.setState({ posts: postsList });
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
    const { posts } = this.state;
    return (
      <div className="all-posts-wrapper">
        {posts ? <ul className="posts-container">
          {posts.map((post, i) => {
            return <li key={i} className="post-list">
              <div className="mr-12">
                <i className="fas fa-user-circle user-icon"></i>
              </div>
              <div>
                <div className="pri-txt mb-4">{post.title ? post.title : "N/A"}</div>
                <div className="sec-txt user-name">{post.username ? post.username : "N/A"}</div>
              </div>
            </li>
          })}</ul> : <Spinner />}
      </div>
    );
  }
}

export default AllPosts;
