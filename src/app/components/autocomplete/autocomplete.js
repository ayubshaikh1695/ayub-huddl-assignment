import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './autocomplete.css';

class Autocomplete extends React.Component {
  static propTypes = {
    autocompleteList: PropTypes.instanceOf(Array),
    searchFor: PropTypes.string
  }

  static defaultProps = {
    autocompleteList: [],
    searchFor: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      activeListItem: 0,
      filteredList: [],
      showLists: false,
      userInput: ''
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (e) => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({
        activeListItem: 0,
        filteredList: [],
        showLists: false,
        userInput: ''
      });
    }
  }

  onChange = e => {
    const { autocompleteList } = this.props;
    const userInput = e.target.value;

    const filteredList = autocompleteList.filter(user =>
      user.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeListItem: 0,
      filteredList,
      showLists: true,
      userInput: e.target.value
    });
  };

  onClick = (userId) => {
    this.setState({
      activeListItem: 0,
      filteredList: [],
      show: false,
      userInput: ''
    });

    this.navigateToUserRoute(userId);
  };

  onKeyDown = e => {
    const { activeListItem, filteredList } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeListItem: 0,
        showLists: false,
        userInput: ''
      });

      if (filteredList.length) {
        this.navigateToUserRoute(filteredList[activeListItem].id);
      }

    } else if (e.keyCode === 38) {

      if (activeListItem === 0) {
        return;
      }
      this.setState({ activeListItem: activeListItem - 1 });

    } else if (e.keyCode === 40) {

      if (activeListItem === filteredList.length - 1) {
        return;
      }
      this.setState({ activeListItem: activeListItem + 1 });
    }
  }

  navigateToUserRoute(userId) {
    this.props.history.push(`/user?userId=${userId}`);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeListItem,
        filteredList,
        showLists,
        userInput
      }
    } = this;
    const { searchFor } = this.props;

    let autocompleteListContainer;

    if (showLists && userInput) {
      if (filteredList.length) {
        autocompleteListContainer = (
          <ul className='autocomplete-list'>
            {filteredList.map((listItem, index) => {
              let className;
              if (index === activeListItem) {
                className = "autocomplete-list-item-active pri-txt";
              } else {
                className = "autocomplete-list-item pri-txt";
              }
              return (
                <li className={className}
                  key={index}
                  onClick={() => onClick(listItem.id)}
                >
                  {listItem.name}
                </li>
              );
            })}
          </ul >
        );
      } else {
        autocompleteListContainer = (
          <div className='autocomplete-list autocomplete-no-results-container'>
            <span className="sec-txt">No {searchFor} found.</span>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <div ref={this.setWrapperRef} className='autocomplete-container'>
          <input
            className='autocomplete-input'
            type='text'
            placeholder={`Search ${searchFor}`}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {autocompleteListContainer}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(props => <Autocomplete {...props} />);
