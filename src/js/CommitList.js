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
      data: { 'orderBy': '"Date"', 'limitToFirst': 100 },
      type: "GET",
      dataType: "json",
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error getting initial list from firebase:", err);
      }.bind(this)
    });
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
            data = {commit.Data}
            login = {commit.Login}
            avatar = {commit.Avatar}
            message = {commit.Message}
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
