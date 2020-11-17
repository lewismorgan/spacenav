import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "fontsource-space-mono";
import "fontsource-abel";
import "fontsource-electrolize";

// Find an element that has 'lds-dual-ring'
const loader = document.querySelector(".lds-dual-ring");

const handleOnMounted = () => {
  loader?.classList.add("lds-dual-ring--hide");
};

// Injects the App component into the HTML DOM using JSX
ReactDOM.render(
  <React.StrictMode>
    <App onMounted={handleOnMounted} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
