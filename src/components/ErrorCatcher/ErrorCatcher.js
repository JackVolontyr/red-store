import React, { Component } from 'react';
import ErrorView from '../ErrorView';

export default class ErrorCatcher extends Component {
  state = { isHasError: false };
  componentDidCatch() { this.setState({ isHasError: true }) }

  render() {
    if (this.state.isHasError) {
      return <div className={this.props.className}><ErrorView /></div>;
    } else {
      return this.props.children;
    }
  }
}
