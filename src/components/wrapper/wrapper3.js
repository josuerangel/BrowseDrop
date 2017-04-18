import React from 'react'
import 'babel-polyfill';
import UploadBox from '../UploadBox'

function renderBrowseDrop(options, container, callback){
  ReactDOM.render(<UploadBox options={options} />, container, callback);
}

module.exports = renderBrowseDrop;
window.renderBrowseDrop = renderBrowseDrop;
