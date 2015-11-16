import React from 'react'
import TerminalInput from '../components/TerminalInput';
import EmailExamples from '../components/EmailExamples';

class App extends React.Component {

  static examples() {
    return [
      'alfred.fazio@gmail.com',
      'john@fitzio.com',
      'paul@aps.org',
      'mdigioia@aps.org',
      'fog@initd.org'
    ];
  }

  updateEmail(email) {
    const { history } = this.props;
    const pathname = history.createHref(`/${email}`);
    history.pushState(null, `/${email}`);
  }
  
  render() {
    const { email } = this.props.params;

    return (
      <div>
        <h1>Gravatar Viewer</h1>

        <EmailExamples examples={App.examples()} />
        <TerminalInput
          className='email-input'
          placeholder="email address"
          hasInitialFocus={true}
          prompt="&nbsp;&nbsp;> "
          initialValue={email || ""}
          onUpdate={email => this.updateEmail(email)} />

        { this.props.children && React.cloneElement(this.props.children, { email }) }
      </div>
    );
  }
}

export default App;
