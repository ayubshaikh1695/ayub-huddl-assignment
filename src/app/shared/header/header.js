import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../services/api-service';
import Autocomplete from '../../components/autocomplete/autocomplete';
import axios from 'axios';
import './header.css';

class Header extends React.Component {
    signal = axios.CancelToken.source();
    abortSignal = { cancelToken: this.signal.token };

    constructor(props) {
        super(props);
        this.state = { showLink: null, users: [] };
    }

    componentDidMount() {
        this.showPostsLink();
        fetchUsers(this.abortSignal).then(res => {
            const data = res.data;
            const users = data.map(user => {
                return { name: user.name, id: user.id }
            });
            this.setState({ users: users });
        }).catch(err => {
            if (axios.isCancel(err)) {
                console.log('Error: ', err.message);
            }
        });
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

    componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
    }

    render() {
        const { showLink, users } = this.state;
        return (
            <header className='header' >
                <h2 className='c-white'>Huddl Assignment</h2>
                <div className="flex no-wrap align-center ml-16">
                    <Autocomplete autocompleteList={users} searchFor='users' />
                    {showLink && <span className='link c-white fw-500 ml-16'
                        onClick={() => this.navigateToPostsRoute()}>All Posts</span>}
                </div>
            </header >
        );
    }
}

export default withRouter(props => <Header {...props} />);