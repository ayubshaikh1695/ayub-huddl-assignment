import React from 'react';
import './all-posts.css';
import { getPosts } from '../../services/services'

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: null };
  }

  componentDidMount() {
    getPosts().then(res => {
      const data = res.data;
      this.setState({ posts: data });
    }).catch(err => { })
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="all-posts-wrapper">
        <ul>
          {posts && posts.map((post, i) => {
            return (<li key={i}>{post.title ? post.title : "N/A"}</li>)
          })}
        </ul>
      </div>
    );
  }
}

export default AllPosts;
