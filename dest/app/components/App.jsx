import React from 'react';

import Navbar from './Navbar.jsx';
import Segment from './Segment.jsx'
import Button from './Button.jsx';
import Segments from './Segments.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div className="full">
        <Navbar />
        <Segments />
      </div>
    );
  }
}
