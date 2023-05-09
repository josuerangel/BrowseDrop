import React from "react";
import ReactDOM from "react-dom";
import BrowseDrop from "./components/Component";

const wrapper = document.getElementById("main");
wrapper ? ReactDOM.render(<BrowseDrop />, wrapper) : false;

//import Form from "./js/components/Form";
