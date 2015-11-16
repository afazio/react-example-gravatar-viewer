import React from 'react';
import md5 from 'blueimp-md5';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class GravatarViewer extends React.Component {

  static className = "gravatar";

  static gravatarUrl(email, size, method) {
    const trim    = (s) => { return s.replace(/^\s+/, '').replace(/\s+$/, ''); };
    const cleaned = (s) => { return trim(s.toLowerCase()); };
    const hash = md5(cleaned(email));
    return `http://gravatar.com/avatar/${hash}?s=${size}&d=${method}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      exists: false,
      fetched: false
    };
  }

  fetchGravatar(email, size) {
    this.setState({ fetched: false });

    const img = new Image();

    img.onload = () => {
      this.setState({
        exists: true,
        fetched: true
      });
    };

    img.onerror = () => {
      this.setState({
        exists: false,
        fetched: true
      });
    };

    img.src = GravatarViewer.gravatarUrl(email, size, '404');
  }

  size(size) {
    return size || this.props.size || '200';
  }

  componentWillReceiveProps(props) {
    this.fetchGravatar(props.email || this.props.email, this.size(props.size));
  }

  componentWillMount() {
    if (this.props.email)
      this.fetchGravatar(this.props.email, this.size());
  }

  render() {
    const { exists, fetched } = this.state;
    const { email } = this.props;
    const size = this.size();

    if (!fetched) {
      return (
        <div></div>
      );
    }

    if (!exists) {
      return (
        <p><code>{email}</code> does not have a gravatar.<br /> ┐(‘～`；)┌</p>
      );
    }

    return (
      <img className={GravatarViewer.className} src={GravatarViewer.gravatarUrl(email, size, 'mm')} />
    );
  }
}

export default GravatarViewer;
