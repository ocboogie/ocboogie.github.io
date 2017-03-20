import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <section id={this.props.id} className={this.props.className + " segment"}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
