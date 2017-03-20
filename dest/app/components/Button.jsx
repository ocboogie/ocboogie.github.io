import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <a className={"bbtn btn " + this.props.className} href={this.props.href}>{this.props.children}</a>
    )
  }
}
