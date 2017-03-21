import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

require("bootstrap-loader");
require('./stylesheets/index.scss');

require('./js/scroll');

ReactDOM.render(React.createElement(App), document.getElementById('root'));
