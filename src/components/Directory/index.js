import React from 'react';
import classNames from 'classnames';
import File from '../file/File';
import FileDragAndDrop from '../FileDragAndDrop';
import './directory.styl';

class Directory extends React.Component {
    constructor(){
        super();
        this.state = {
            isDragEnter: false
        }
    }
    handleDrop(dataTransfer, event) {
        this.props.addFile(dataTransfer.files, this.props.data);
    }
    handleDragEnter(event){
        this.setState({isDragEnter: true});
    }
    handleDragLeave(event){
        this.setState({isDragEnter: false});
    }
    handleDragOver(event){
        event.preventDefault();
        this.setState({isDragEnter: true});
    }
    render() {
        var directoryClass = classNames({
            "directory__item": true,
            'directory__item-dragEnter': this.state.isDragEnter
        });
        return <div className={directoryClass}>
            <FileDragAndDrop onDrop={this.handleDrop.bind(this)}
                onDragEnter={this.handleDragEnter.bind(this)}
                onDragLeave={this.handleDragLeave.bind(this)}
                onDragOver={this.handleDragOver.bind(this)} >
            <File data={this.props.data} onClick={this.props.onClick} ></File>
            </FileDragAndDrop>
        </div>
    }
};

module.exports = Directory;
