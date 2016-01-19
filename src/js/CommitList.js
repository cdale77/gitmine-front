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

    let uniqDates = this.getUniqDates(commitData);

    let sortedCommits = [];
    uniqDates.reverse().map(function(date) {

      for(let key in commitData) {
        let commit = commitData[key];
        let commitDate = new Date(commit.Date);
        commitDate.setHours(0,0,0,0);

        if (date == commitDate) {
          sortedCommits.push(commit);
          delete commitData[key];
        }
      }
    });

    return sortedCommits;
  }

  getUniqDates(commitData) {
    let dates = [];

    for(let commit in commitData) {
      dates.push(commitData[commit].Date);
    }

    //collapse and sort the date array
    let simpleDates = dates.map(function(date) {
      let parsedDate =  new Date(date);
      parsedDate.setHours(0,0,0,0);
      return(parsedDate.toString());
    });

    return [ ...new Set(simpleDates) ];
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
