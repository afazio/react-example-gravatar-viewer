import React from 'react';
import { Link } from 'react-router';

export default class EmailExamples extends React.Component {
  render() {
    return (
      <div id="email-examples">
        <p>For example:</p>
        <ul>
          {
            this.props.examples.map( (example, index) => {
              return (
                <li key={index}>
                  <Link to={`/${example}`}>{example}</Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
