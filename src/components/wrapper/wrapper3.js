import React from 'react'
import 'babel-polyfill';
import UploadBox from '../UploadBox'

function renderUploadBox(options, container, callback){
  ReactDOM.render(<UploadBox options={options} />, container);
}

module.exports = renderUploadBox;
window.renderUploadBox = renderUploadBox;
