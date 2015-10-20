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
      dataType: "json",
      success: function(data) {
        console.log("success");
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error");
        console.log(err);
      }.bind(this)
    });
  }

  render() {
    console.log("building listings");
    var commitListings = [];
    var commitData = this.state.data;
    for(var key in commitData) {
      if (commitData.hasOwnProperty(key)) {
        var commit = commitData[key];
        console.log("looping", commit);
        commitListings.push(
          <CommitListing
            data = {commit.Data}
            login = {commit.Login}
            avatar = {commit.Avatar}
            message = {commit.Message}
            url = {commit.Url} />
        );

      };

    };

    console.log("commit listings are:");
    console.log(commitListings);

    return (
      <div className="commit-list">
        Here are the commits:
        {commitListings}
      </div>
    );
  }
}

export default CommitList
