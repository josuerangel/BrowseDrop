import React from 'react'
import UploadBox from '../UploadBox'

let nodes = [];

const ReactContentRenderer = {
    unmountAll() {
        if (nodes.length === 0) {
            return;
        }
        nodes.forEach(node => React.unmountComponentAtNode(node));
        nodes = [];
    },
    render(element, container, callback) {
        if (container instanceof jQuery) {
            container = container.get(0);
        }
        //React.render(element, container, callback);
        ReactDOM.render(element, container)
        nodes.push(container);
    }
};

function renderUploadBox(files){
  ReactContentRenderer.render(<UploadBox dataFilesAndDirs={files} />, document.getElementById("UploadBox"));
}

module.exports = renderUploadBox;
window.renderUploadBox = renderUploadBox;
