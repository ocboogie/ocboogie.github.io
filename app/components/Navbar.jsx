import React from 'react';

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { collapse: "" }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (document.body.scrollTop > 0) {
      this.setState({ collapse: "top-nav-collapse" });
    } else {
      this.setState({ collapse: "" });
    }
  }

  render() {
    return (
      <nav className={ "navbar navbar-inverse navbar-fixed-top " + this.state.collapse } role="navigation">
        <div className="container">
          <div className="navbar-header page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">ocboogie</a>
          </div>
          <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-nav">
              <li className="hidden active">
                <a className="page-scroll nav-btn" href="#page-top"></a>
              </li>
              <li className="">
                <a className="page-scroll nav-btn" href="#about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
