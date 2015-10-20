import React from "react";
import CommitList from "./CommitList";

React.render(
  <CommitList firebaseUrl="https://go-git.firebaseio.com/.json" />,
  document.getElementById("app")
);

