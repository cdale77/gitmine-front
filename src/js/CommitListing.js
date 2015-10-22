import React from "react";

class CommitListing extends React.Component {
  render() {
    return (
      <div className="commit-listing">
        <div className="avatar commit-item">
          <a href={"https://github.com/" + this.props.login}>
            <img src={this.props.avatar} />
          </a>
        </div>
        <div className="date commit-item">{this.props.date.split("T")[0]}</div>
        <div className="message commit-item">
          <a href={this.props.url}>{this.props.message}</a>
        </div>
      </div>
    );
  }
}

export default CommitListing
