import React from 'react';

class EmailInput extends React.Component {
  onSubmit(event) {
    this.props.onUpdate(this.refs.email.value);
    event.preventDefault();
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.email
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  componentWillReceiveProps(next) {
    this.setState({value: next.email});
  }
  
  render() {
    const value = this.state.value;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="email" ref="email" value={value} onChange={this.handleChange.bind(this)} />
      </form>
    );
  }
}

export default EmailInput;
