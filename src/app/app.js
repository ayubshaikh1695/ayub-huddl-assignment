import React from 'react';
import './app.css';
import AllPosts from './components/all-posts/all-posts';
import Post from './components/post/post';
import User from './components/user/user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './shared/header/header';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Router>
        <div className="app-wrapper bg-lavender">
          <div className="jumbotron">
            <Switch>
              <Route exact path='/'>
                <Redirect to="/posts"></Redirect>
              </Route>
              <Route path="/posts" component={AllPosts} />>
            <Route path="/post" component={Post} />
              <Route path="/user" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
