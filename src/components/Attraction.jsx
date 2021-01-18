import React from 'react';
import axios from 'axios';
import Header from './Header';
import Overview from './Overview';
import Tickets from './Tickets';
import Images from './Images';

export default class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      likeHover: false,
      form: {
        description: '',
        isOpen: false,
        suggestedDuration: 0,
        address: '',
      },
      clickImproved: false,
    };
    this.updateHeartHover = this.updateHeartHover.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/showcase')
      .then(({ data }) => {
        this.setState({
          current: data[0],
        });
      }).catch((err) => console.log('error GETTING all', err));
  }

  handleClick() {
    const { clickImproved } = this.state;
    this.setState({
      clickImproved: !clickImproved,
    });
  }

  handleFormChange(e) {
    const { form } = this.state;
    // must copy new value, cannot modify e.target.value directly
    let newValue = e.target.value;
    if (e.target.name === 'suggestedDuration') {
      newValue = Number(newValue);
    }
    if (newValue === 'true') {
      newValue = true;
    }
    if (newValue === 'false') {
      newValue = false;
    }
    this.setState({
      form: {
        ...form,
        [e.target.name]: newValue,
      },
    });
  }

  updateHeartHover() {
    const { likeHover } = this.state;
    this.setState({
      likeHover: !likeHover,
    });
  }

  render() {
    const {
      current, likeHover, form, clickImproved,
    } = this.state;
    return (
      <>
        {current ? (
          <div className="attraction">
            <Header
              current={current}
              updateHeartHover={this.updateHeartHover}
              likeHover={likeHover}
            />
            <Overview
              overview={current.overview}
              form={form}
              clicked={clickImproved}
              handleClick={this.handleClick}
              handleFormChange={this.handleFormChange}
            />
            <Tickets current={current} />
            <Images images={current.imageUrl} />
          </div>
        ) : <div className="loading">Loading...</div>}
      </>
    );
  }
}