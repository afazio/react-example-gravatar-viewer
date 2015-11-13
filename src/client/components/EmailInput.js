import React from 'react';

class EmailInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.email
    };
  }

  onSubmit(event) {
    this.props.onUpdate(this.refs.email.value);
    event.preventDefault();
    return false;
  }

  onChange(event) {
    this.setState({value: event.target.value});
  }

  componentWillReceiveProps(next) {
    this.setState({value: next.email});
  }
  
  render() {
    const value = this.state.value;
    const { email, onUpdate, ...other } = this.props;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input {...other}
          type="email"
          ref="email"
          value={value}
          onChange={this.onChange.bind(this)} />
      </form>
    );
  }
}

export default EmailInput;
