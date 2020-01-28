import React from 'react';
import './app.css';
import AllPosts from './components/all-posts/all-posts';

function App() {
  return (
    <React.Fragment>
      <header className="header">
        <h2 className="header-label">Test</h2>
      </header>
      <div className="app-wrapper bg-lavender">
        <AllPosts />
      </div>
    </React.Fragment>
  );
}

export default App;
