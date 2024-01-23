import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="Button" onClick={this.props.onClick} disabled={!this.props.hasMore}>
        Load more
      </button>
    );
  }
}

export default Button;