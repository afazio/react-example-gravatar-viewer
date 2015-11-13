import React from 'react';
import md5 from 'blueimp-md5';

class GravatarViewer extends React.Component {
  trim(s) {
    return s.replace(/^\s+/, '').replace(/\s+$/, '')
  }

  cleaned(s) {
    return this.trim(s.toLowerCase());
  }

  hashedEmail() {
    return md5(this.cleaned(this.props.params.email));
  }

  render() {
    const hash = this.hashedEmail();
    const className = this.props.className || "gravatar";

    return (
      <img className={className} src={`http://gravatar.com/avatar/${hash}?s=200`} />
    );
  }
}

export default GravatarViewer;
