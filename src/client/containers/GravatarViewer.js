import React from 'react';
import md5 from 'blueimp-md5';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class GravatarViewer extends React.Component {

  static className = "gravatar";

  static gravatarUrl(hash, size, method) {
    return `http://gravatar.com/avatar/${hash}?s=${size}&d=404`;
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: this.props.params.email != undefined,
      fetched: false
    };
  }

  trim(s) {
    return s.replace(/^\s+/, '').replace(/\s+$/, '')
  }

  cleaned(s) {
    return this.trim(s.toLowerCase());
  }

  hashedEmail(email) {
    return md5(this.cleaned(email || this.props.params.email));
  }

  fetchGravatar(email, size) {
    this.setState({
      fetching: true,
      fetched: false
    });
    console.log('fetchGravatar(' + email + ')');
    const img = new Image();
    const hash = this.hashedEmail(email);
    img.onload = () => {
      console.log('success');
      this.setState({
        hash,
        email,
        size,
        fetching: false,
        fetched: true,
        exists: true
      });
    };
    img.onerror = () => {
      console.log('error');
      this.setState({
        hash,
        email,
        size,
        fetching: false,
        fetched: true,
        exists: false
      });
    };
    img.src = GravatarViewer.gravatarUrl(hash, size, '404');
  }

  size(size) {
    return size || this.props.size || '200';
  }

  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps')
    this.fetchGravatar(props.params.email || this.props.params.email, this.size(props.size));
  }

  componentWillMount() {
    console.log('componentWillMount')
    if (this.props.params.email)
      this.fetchGravatar(this.props.params.email, this.size());
  }

  render() {
    const hash = this.state.hash;
    const size = this.state.size;

    console.log('render');

    // if (this.state.fetching) {
    //   return (
    //     <p>loading ...</p>
    //   );
    // }

    if (!this.state.exists) {
      return (
        <p><code>{this.state.email}</code> does not have a gravatar.<br /> ┐(‘～`；)┌</p>
      );
    }

    return (
      <img className={GravatarViewer.className} src={GravatarViewer.gravatarUrl(hash, size, 'mm')} />
    );
  }
}

export default GravatarViewer;
