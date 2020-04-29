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
      //if (this.props.data.drag === true)
        this.props.onDrop(dataTransfer.files, this.props.data);
    }
    handleDragEnter(event){
      event.preventDefault();
      event.stopPropagation();
      this.setState({isDragEnter: true});
      this.props.onDragEnter(this.props.data);
    }
    handleDragLeave(event){
      event.preventDefault();
      event.stopPropagation();
      this.setState({isDragEnter: false, isDragOver: false});
      this.props.onDragLeave(this.props.data);
    }
    handleDragOver(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({isDragOver: true});
        this.props.onDragOver(this.props.data);
    }
    render() {
    }
}

export default ZoneDrop;
