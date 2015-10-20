import React from "react";
import CommitList from "./CommitList";

React.render(
  <CommitList firebaseUrl="https://gitmine.firebaseio.com/.json" />,
  document.getElementById("app")
);

