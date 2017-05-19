import React from 'react'
import PropTypes from 'prop-types'

var style = {
  width: '100%',
  height: '100%'
};

class FileDragAndDrop extends React.Component {
  constructor(props){
    super(props);
  };
  handleDragStart(event) {
    if (typeof this.props.onDragStart === 'function') {
      this.props.onDragStart(event);
    }
  };

  handleDrag(event) {
    if (typeof this.props.onDrag === 'function') {
      this.props.onDrag(event);
    }
  };

  handleDragEnter(event) {
    console.log('filedragdrop handleDragEnter');
    console.log(this);
    if (typeof this.props.onDragEnter === 'function') {
      this.props.onDragEnter(event);
    }
  };

  handleDragLeave(event) {
    if (typeof this.props.onDragLeave === 'function') {
      this.props.onDragLeave(event);
    }
  };

  handleDragOver(event) {
    event.preventDefault();
    if (typeof this.props.onDragOver === 'function') {
      this.props.onDragOver(event);
    }
  };

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.length > 0) {
      if (typeof this.props.onDrop === 'function') {
        this.props.onDrop(event.dataTransfer, event, this.props.dataDrop);
      }
    }
  };

  handleDragEnd(event) {
    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(event);
    }
  };

  render() {
    return (
      <div
        onDragStart={this.handleDragStart.bind(this)}
        onDrag={this.handleDrop.bind(this)}
        onDragEnter={this.handleDragEnter.bind(this)}
        onDragLeave={this.handleDragLeave.bind(this)}
        onDragOver={this.handleDragOver.bind(this)}
        onDrop={this.handleDrop.bind(this)}
        onDragEnd={this.handleDragEnd.bind(this)}
        style={style}>
        {this.props.children}
      </div>
    );
  }
};

FileDragAndDrop.propTypes = {
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  dataDrop: PropTypes.string
};

module.exports = FileDragAndDrop;
