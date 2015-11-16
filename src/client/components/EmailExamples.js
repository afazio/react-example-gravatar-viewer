import React from 'react';
import { Link } from 'react-router';

export default class EmailExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: 0
    };
  }

  setNextExample() {
    let currentExample = this.state.currentExample;
    currentExample += 1;
    currentExample = currentExample % this.props.examples.length;
    this.setState({currentExample});
  }

  animateExample() {
    this.refs.example.className = "fadeout";
    window.setTimeout(() => {
      this.setNextExample.bind(this)();
      this.refs.example.className = "fadein";
    }, 1000);
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.animateExample.bind(this)();
    }, 2500);
  }

  render() {
    const example = this.props.examples[this.state.currentExample];
    return (
      <div className="email-examples">
        <p>For example: <span ref="example"><Link to={`/${example}`}>{example}</Link></span></p>
      </div>
    );
  }
}
