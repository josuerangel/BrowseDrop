import React from 'react'
import UploadBox from '../UploadBox'

function renderUploadBox(options, container, callback){
  console.log('before to mount');
  ReactDOM.render(<UploadBox options={options} />, container);
  console.log('after to mount');
  callback("component rendered");
}

module.exports = renderUploadBox;
window.renderUploadBox = renderUploadBox;
