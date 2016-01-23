import $ from "jquery";
import React from "react";
import CommitListing from "./CommitListing";

class CommitList extends React.Component {

  constructor() {
    super();
    this.state = {data: []};
  }

  componentWillMount() {
    $.ajax({
      url: this.props.firebaseUrl,
      data: { 'orderBy': '"Date"', 'limitToLast': 200 },
      type: "GET",
      dataType: "json",
      success: function(data) {
        let sortedCommits = this.sortCommits(data);
        this.setState({data: sortedCommits});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error getting initial list from firebase:", err);
      }.bind(this)
    });
  }

  sortCommits(commitData) {
    let sortedCommits = [];
    for (let key in commitData) {
      let commit = commitData[key];
      sortedCommits.push(commit);
    }
   return sortedCommits.reverse();
  }

  filterMessage(messageText) {
    if (messageText.length > 155) {
      return messageText.substr(0, 155) + " . . ."
    } else {
      return messageText
    }
  }

  render() {
    var commitListings = [];
    var commitData = this.state.data;
    for(var key in commitData) {
      if (commitData.hasOwnProperty(key)) {
        var commit = commitData[key];
        commitListings.push(
          <CommitListing
            key = {key}
            date = {commit.Date}
            login = {commit.Login}
            avatar = {commit.Avatar}
            message = {this.filterMessage(commit.Message)}
            url = {commit.Url} />
        );
      };
    };

    return (
      <div className="commit-list">
        {commitListings}
      </div>
    );
  }
}

export default CommitList
