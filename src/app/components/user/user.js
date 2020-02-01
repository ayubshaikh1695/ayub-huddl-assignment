import React from 'react';
import './user.css';
import { fetchUserById } from '../../services/api-service';
import Spinner from '../../shared/spinner/spinner';
import queryString from 'query-string';
import axios from 'axios';

class User extends React.Component {
  signal = axios.CancelToken.source();
  abortSignal = { cancelToken: this.signal.token };

  constructor(props) {
    super(props);
    this.state = { userInfo: null };
  }

  componentDidMount() {
    this.userDetails();
  }


  userDetails = () => {
    const queryValues = queryString.parse(this.props.location.search);
    const userId = queryValues.userId;

    this.setState({ userInfo: null });
    fetchUserById(userId, this.abortSignal).then(res => {
      const user = res.data;
      this.setState({ userInfo: user });
    }).catch(err => {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message);
      }
    });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.userDetails();
    }
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div className="user-wrapper">
        {userInfo ?
          <div className="user-container br-rd-4 bx-shw bg-white">
            <div className="user-main-detail mb-4 flex align-center">
              <div className="mr-12 self-start">
                <i className="fas fa-user-circle user-icon"></i>
              </div>
              <div>
                <div className="pri-txt fw-600 mb-4">{userInfo.name ? userInfo.name : "N/A"}</div>
                <div className="sec-txt mb-4">{userInfo.username ? '@' + userInfo.username : "N/A"}</div>
                <div>
                  <span className="sec-txt"><i className="fas fa-envelope"></i>
                    &ensp;
                  {userInfo.email ? userInfo.email : "N/A"}</span>
                  &emsp;
                <span className="sec-txt"><i className="fas fa-globe-americas"></i>
                    &ensp;
                {userInfo.website ? userInfo.website : "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="user-company-detail mb-24 flex align-center">
              <div className="mr-12 self-start">
                <i className="fas fa-briefcase user-icon"></i>
              </div>
              <div>
                <div className="sec-txt mb-4"><span className="pri-txt fw-600">Company name : </span>{userInfo.company.name ? userInfo.company.name : "N/A"}</div>
                <div className="sec-txt mb-4"><span className="pri-txt fw-600">Type : </span>{userInfo.company.catchPhrase ? userInfo.company.catchPhrase : "N/A"}</div>
                <div className="sec-txt mb-4"><span className="pri-txt fw-600">Slogan : </span>{userInfo.company.bs ? userInfo.company.bs : "N/A"}</div>
              </div>
            </div>
          </div>
          : <Spinner />}
      </div>
    );
  }
}

export default User;
