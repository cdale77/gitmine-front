var CommitList = require("./CommitList");

React.render(
  <CommitList firebaseUrl="https://go-git-dev.firebaseio.com/.json" />,
  document.getElementById("app")
);

