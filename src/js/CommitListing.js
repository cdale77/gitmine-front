import React from "react";

class CommitListing extends React.Component {
  render() {
    return (
      <div className="commit-listing">
        <h3>Commit</h3>
        Login: {this.props.login}<br />
        Avatar: {this.props.avatar}<br />
        Message: {this.props.message}<br />
        Url: {this.props.url}
      </div>
    );
  }
}

export default CommitListing
