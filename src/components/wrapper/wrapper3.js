import React from 'react'
import 'babel-polyfill';
import UploadBox from '../UploadBox'

function renderBrowseDrop(options, container, callback){
  let _BrowseDrop = null;
  ReactDOM.render(<UploadBox options={options} ref={(_bd => { _BrowseDrop = _bd; })} />, container, callback);
  return _BrowseDrop;
}

module.exports = renderBrowseDrop;
window.renderBrowseDrop = renderBrowseDrop;
