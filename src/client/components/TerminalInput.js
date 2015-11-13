import React from 'react';

export default class TerminalInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue,
      focused: false
    };
  }

  handleClick(event) {
    this.refs.hidden.focus();
  }

  handleSubmit(event) {
    this.props.onUpdate(this.state.value);
    event.preventDefault();
    return false;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange && this.props.onChange(event);
  }

  handleKeyDown(event) {
    const code = event.keyCode;
    if (code == 37 || code == 39) // left or right arrow keys
      event.preventDefault();

    if (code == 38) // up arrow key
      history.back();

    if (code == 40) // down arrow key
      history.forward();
  }

  handleFocus(event) {
    this.setState({focused: true});

    setTimeout( () => {
      // place the cursor at the end of the input
      const value = this.state.value;
      const length = value.length;

      if (event.target.setSelectionRange) {
        // doesn't work in IE
        console.log('setSelectionRange(' + length*2 + ')');
        event.target.setSelectionRange(length * 2, length * 2) // multiply by two for Opera
      } else {
        console.log('text replace');
        this.refs.hidden.value = this.state.value;
      }
    }, 1);
  }

  handleBlur(event) {
    this.setState({focused: false});
  }

  componentWillReceiveProps(next) {
    this.setState({value: next.initialValue});
  }

  componentDidMount() {
    if (this.props.hasInitialFocus)
      this.refs.hidden.focus();
  }

  render() {
    const { prompt, initialValue, onUpdate, onChange, ...other } = this.props;
    const value = this.state.value;
    const type = this.props.type || 'text';
    const className = 'terminal-input ' + this.props.className;
    const caratClassName = 'terminal-input-carat' + (this.state.focused ? ' blink' : '');
    const placeholder = (!value ? this.props.placeholder : '');

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type={type} ref="hidden"
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={value}
          style={{position: 'absolute', top: -1000, left: -1000}} />
        <div {...other} ref="display" className={className} onClick={this.handleClick.bind(this)}>
          <p>
            {`${prompt}${value}`}<span className={caratClassName}>|</span><span className="terminal-input-placeholder">{placeholder}</span>
          </p>
        </div>
      </form>
    );
  }
};
