import React from 'react';
import './app.css';
import AllPosts from './components/all-posts/all-posts';
import Post from './components/post/post';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <header className="header">
        <h2 className="header-label">Huddl Assignment</h2>
      </header>
      <Router>
        <div className="app-wrapper bg-lavender">
          <Switch>
            <Route exact path='/'>
              <Redirect to="/posts"></Redirect>
            </Route>
            <Route path="/posts">
              <AllPosts />
            </Route>
            <Route path="/post/:userId/:postId" component={ Post } />
              {/* <Post /> */}
            {/* </Route> */}
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
