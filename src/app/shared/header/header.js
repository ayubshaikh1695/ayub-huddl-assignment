import React from 'react';
import './header.css';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLink: null };
    }

    componentDidMount() {
        this.showPostsLink();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.showPostsLink();
        }
    }

    showPostsLink() {
        if (this.props.location.pathname !== '/posts') {
            this.setState({ showLink: true });
        } else {
            this.setState({ showLink: false });
        }
    }

    navigateToPostsRoute() {
        this.props.history.push('/posts');
    }

    render() {
        const { showLink } = this.state;
        return (
            <header className="header" >
                <h2 className="c-white">Huddl Assignment</h2>
                {showLink && <span className="link c-white fw-500"
                    onClick={() => this.navigateToPostsRoute()}>All Posts</span>}
            </header >
        );
    }
}

export default withRouter(props => <Header {...props} />);