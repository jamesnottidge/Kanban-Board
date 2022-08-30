import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "tw-elements";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateContext";
import { combineReducers } from "./logic-containers/utils";
import { boardsListReducer } from "./logic-containers/boardsList";
import { boardReducer } from "./logic-containers/boardReducer";

const reducer = combineReducers(boardsListReducer, boardReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>
  //   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
