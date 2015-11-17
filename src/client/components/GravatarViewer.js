import React from 'react';
import md5 from 'blueimp-md5';

class GravatarViewer extends React.Component {

  static className = "gravatar";

  static gravatarUrl(email, size, failMethod = 'mm') {
    const trim    = (s) => { return s.replace(/^\s+/, '').replace(/\s+$/, ''); };
    const cleaned = (s) => { return trim(s.toLowerCase()); };
    const hash = md5(cleaned(email));
    return `http://gravatar.com/avatar/${hash}?s=${size}&d=${failMethod}`;
  }

  fetchGravatar(email, size) {
    this.props.actionGravatarFetching();

    const img = new Image();
    img.onload = this.props.actionGravatarFetchedSuccess;
    img.onerror = this.props.actionGravatarFetchedFail;
    img.src = GravatarViewer.gravatarUrl(email, size, '404');
  }

  componentWillReceiveProps(props) {
    if (props.email != this.props.email ||
        props.size != this.props.size)
      this.fetchGravatar(props.email, props.size);
  }

  componentWillMount() {
    if (this.props.email)
      this.fetchGravatar(this.props.email, this.props.size);
  }

  render() {
    const { email, exists, fetched, size } = this.props;

    if (!fetched)
      return <div></div>;

    if (!exists)
      return <p><code>{email}</code> does not have a gravatar.<br /> ┐(‘～`；)┌</p>;

    return <img className={GravatarViewer.className} src={GravatarViewer.gravatarUrl(email, size)} />;
  }
}

export default GravatarViewer;
