import React from 'react';
import ReactDOM from 'react-dom';
import BrowseDrop from './components/Component';

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<BrowseDrop />, wrapper) : false;

//import Form from "./js/components/Form";
