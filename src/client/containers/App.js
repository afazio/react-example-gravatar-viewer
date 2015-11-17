import React from 'react'
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';

import TerminalInput from 'components/TerminalInput';
import EmailExamples from 'components/EmailExamples';
import * as GravatarActionCreators from 'actions/gravatar';

class App extends React.Component {

  static examples = [
    'alfred.fazio@gmail.com',
    'john@fitzio.com',
    'paul@aps.org',
    'mdigioia@aps.org',
    'fog@initd.org'
  ];

  updateEmail(email) {
    const { history } = this.props;
    history.pushState(null, `/${email}`);
  }
  
  render() {
    const { dispatch,
            gravatar,
            children,
            params: { email } } = this.props;
    const gravatarActions = bindActionCreators(GravatarActionCreators, dispatch);

    return (
      <div>
        <h1>Gravatar Viewer</h1>
        <EmailExamples examples={App.examples} />
        <TerminalInput
          className='email-input'
          placeholder="email address"
          hasInitialFocus={true}
          prompt="&nbsp;&nbsp;> "
          initialValue={email || ""}
          onUpdate={email => this.updateEmail(email)} />

        {/*
           Here the GravatarViewer will be instantiated by react-router when the URL matches.
           React-router passes an instance of GravatarViewer down in this.props.children.  But we
           want to instantiate GravatarViewer with our own props object, so we use
           `React.cloneElement` here to do just that.  We pass down bound action creators, the part
           of the state tree we wish to pass down, and any other props we wish to define.
        */}
        { children && React.cloneElement(children, {
            ...gravatarActions,
            ...gravatar,
            email
          })
        }
      </div>
    );
  }
}

function mapStateToProps(immutableState) {
  // We don't pass the immutable structure down as props because props are read-only anyways.  In
  // reducers, however, we want the state as an Immutable structure.
  const state = immutableState.toJS();
  return {gravatar: state.gravatar};
}

export default connect(mapStateToProps)(App);
