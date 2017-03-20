import React from 'react';

import Segment from './Segment.jsx';
import Button from './Button.jsx';
import oclogo from '../imgs/OC-Long-logo.png';

export default class Segments extends React.Component {
  render() {
    return (
      <div className="full">
        <Segment id="intro" className="intro-section">
          <img className="main-logo" src={ oclogo } />
          <span className="name">ocboogie</span>
          <Button href="#about">About</Button>
        </Segment>
        <Segment id="about" className="about-section">
          <h1>About</h1>
        </Segment>
      </div>
    );
  }
}
