var CommitList  = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function() {
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
  },

  render: function() {
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
});

