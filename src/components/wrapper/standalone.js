import React from 'react';
import "@babel/polyfill";
import BrowseDrop from '../browsedrop';

function renderBrowseDrop(options, container, callback){
  let _BrowseDrop = null;
  ReactDOM.render(<BrowseDrop options={options} ref={(_bd => { _BrowseDrop = _bd; })} />, container, callback);
  return _BrowseDrop;
}

module.exports = renderBrowseDrop;
window.renderBrowseDrop = renderBrowseDrop;
