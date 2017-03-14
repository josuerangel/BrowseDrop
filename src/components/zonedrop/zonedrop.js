import React from 'react';

class ZoneDrop extends React.Component {
    constructor(){
        super();
        this.state = {
            isDragEnter: false,
            isDragOver: false
        };
    }
    handleDrop(dataTransfer, event) {
      this.setState({isDragEnter: false, isDragOver: false});
      console.log('zonedrop evetn drop: ', dataTransfer.file, this.props.data);
      this.props.onDrop(dataTransfer.files, this.props.data);
    }
    handleDragEnter(event){
      event.preventDefault();
      event.stopPropagation();
      this.setState({isDragEnter: true});
    }
    handleDragLeave(event){
      event.preventDefault();
      event.stopPropagation();
      this.setState({isDragEnter: false, isDragOver: false});
    }
    handleDragOver(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({isDragOver: true});
    }
    render() {
    }
}

module.exports = ZoneDrop;
