import React from 'react';
import File from '../file/File';
import FileDragAndDrop from '../FileDragAndDrop';

class Directory extends React.Component {
    handleDrop(dataTransfer, event) {
        this.props.addFile(dataTransfer.files, this.props.data);
    }    
    render() {
        return <div>
            <FileDragAndDrop onDrop={this.handleDrop.bind(this)}>
            <File data={this.props.data}></File>
            </FileDragAndDrop>
        </div>
    }
};

module.exports = Directory;
