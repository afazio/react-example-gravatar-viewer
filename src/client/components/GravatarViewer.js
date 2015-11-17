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

  setSizeSmall(event) {
    this.props.actionGravatarChangeSize(100);
    event.preventDefault();
  }

  setSizeMedium(event) {
    this.props.actionGravatarChangeSize(250);
    event.preventDefault();
  }

  setSizeLarge(event) {
    this.props.actionGravatarChangeSize(500);
    event.preventDefault();
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

    return (
      <div>
        <a className={GravatarViewer.className + '-size-input'} href="#" onClick={this.setSizeSmall.bind(this)}>&#9642;</a>
        <a className={GravatarViewer.className + '-size-input'} href="#" onClick={this.setSizeMedium.bind(this)}>&#9726;</a>
        <a className={GravatarViewer.className + '-size-input'} href="#" onClick={this.setSizeLarge.bind(this)}>&#11035;</a><br />
        <img className={GravatarViewer.className} src={GravatarViewer.gravatarUrl(email, size)} />

        <style>{`
          .gravatar-size-input {
            font-size: 120%;
          }

          img.gravatar {
            border-radius: 50%;
          }
        `}</style>
      </div>
    );
  }
}

export default GravatarViewer;
