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
    console.log(`Asked to update email to: ${email}`);
    console.log(`Pushing URL ${pathname}`);
    history.pushState(null, `/${email}`);
  }
  
  render() {
    return (
      <div>
        <h1>Gravatar Viewer</h1>

        <TerminalInput
          className='email-input'
          placeholder="email address"
          hasInitialFocus={true}
          prompt="&nbsp;&nbsp;> "
          initialValue={this.props.params.email}
          onUpdate={email => this.updateEmail(email)} />
        
        {/*<EmailExamples examples={App.examples()} />*/}

        { this.props.children }
      </div>
    );
  }
}

export default App;
