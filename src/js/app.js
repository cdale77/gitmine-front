import React from "react";
import CommitList from "./CommitList";

React.render(
  <CommitList firebaseUrl="https://go-git-dev.firebaseio.com/.json" />,
  document.getElementById("app")
);

