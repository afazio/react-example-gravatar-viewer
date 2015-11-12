import React from 'react';

class EmailInput extends React.Component {
  onSubmit(event) {
    this.props.onUpdate(this.refs.email.value);
    event.preventDefault();
    return false;
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="email" ref="email" defaultValue={this.props.email} />
      </form>
    );
  }
}

export default EmailInput;
