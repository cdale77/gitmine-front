import React from "react";

class CommitListing extends React.Component {
  render() {
    return (
      <div className="commit-listing">
        <div className="avatar">
          <a href={"https://github.com/" + this.props.login}>
            <img src={this.props.avatar} />
          </a>
        </div>
        <div className="date">{this.props.date.split("T")[0]}</div>
        <div className="message">
          <a href={this.props.url}>{this.props.message}</a>
        </div>
      </div>
    );
  }
}

export default CommitListing
