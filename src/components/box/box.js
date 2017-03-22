import React from 'react'
import BoxHeader from './boxheader/boxheader.js'
import File from '../file/File.js'
import Directory from '../Directory/'
import FileDragAndDrop from '../FileDragAndDrop'
import classNames from 'classnames'
import './box.styl'
import ZoneDrop from '../zonedrop/zonedrop.js'

class BoxList extends ZoneDrop {
  render() {
    let directoryClass = classNames({'upb__BoxList': true, 'box__dragOver': this.state.isDragOver});
    return <div className={directoryClass}>
      <FileDragAndDrop onDrop={this.handleDrop.bind(this)} onDragEnter={this.handleDragEnter.bind(this)} onDragLeave={this.handleDragLeave.bind(this)} onDragOver={this.handleDragOver.bind(this)}>
        {this.props.items}
      </FileDragAndDrop>
    </div>
  }
}

class Box extends React.Component {
  constructor() {
    super();
    this.state = {
      isDragOver: false
    }
  }
  setItemList() {
    return this.props.data.map((item, index) => (item.type === "directory")
      ? <Directory key={index.toString()} data={item} onClick={this.props.onClickDirectory} onDrop={this.props.onDrop}/>
      : <File key={index.toString()} data={item}/>)
  }
  render() {
    return <div>
      <BoxHeader></BoxHeader>
      <BoxList data={this.props.directory} items={this.setItemList()} onDrop={this.props.onDrop}></BoxList>
    </div>
  }
};

module.exports = Box;
