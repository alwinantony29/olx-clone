import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Context from "./store/Context";
import { FirebaseContext,authContext } from "./store/Context";
import { db } from "./firebase/config";
ReactDOM.render(
  <FirebaseContext.Provider value={{ db }}>
<Context>
<App />
</Context>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
