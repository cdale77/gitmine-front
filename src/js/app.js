import React from "react";
import ReactDOM from "react-dom";
import CommitList from "./CommitList";

ReactDOM.render(
  <CommitList firebaseUrl="https://gitmine.firebaseio.com/.json" />,
  document.getElementById("app")
);

