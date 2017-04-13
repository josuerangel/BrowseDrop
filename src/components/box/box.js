import React from 'react'
import BoxHeader from './boxheader/boxheader.js'
import File from '../file/File.js'
import Directory from '../Directory/'
import FileDragAndDrop from '../FileDragAndDrop'
import classNames from 'classnames'
import './box.styl'
import ZoneDrop from '../zonedrop/zonedrop.js'
import Grid from 'react-bootstrap/lib/Grid'
import GoCloudUpload from 'react-icons/lib/go/cloud-upload'

class BoxListFooter extends React.Component {
  constructor() {
    super();
  }
  render(){
    const messageCloud = (this.props.settings.caption.labelBoxFooter === undefined)
      ? "Drag and drop files here"
      : this.props.settings.caption.labelBoxFooter;
    return <div className={"upb__BoxList__Footer"}>
      <GoCloudUpload className={"upb__BoxList__Footer__iconCloud"}></GoCloudUpload>
      <div>{messageCloud}</div>
      </div>
  }
}

class BoxList extends ZoneDrop {
  render() {
    let directoryClass = classNames({'upb__BoxList': true, 'box__dragOver': this.state.isDragOver});
    return <div className={directoryClass}>
      <FileDragAndDrop onDrop={this.handleDrop.bind(this)} onDragEnter={this.handleDragEnter.bind(this)} onDragLeave={this.handleDragLeave.bind(this)} onDragOver={this.handleDragOver.bind(this)}>
        {this.props.items}
        <BoxListFooter settings={this.props.settings}></BoxListFooter>
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
    const arrBox = this.props.data.filter((item) => (item.parentId === this.props.directory.id));
    return arrBox.map((item, index) => (item.type === "directory")
      ? <Directory key={index.toString()} data={item} onClick={this.props.onClickDirectory}
      onDrop={this.props.onDrop} onDragEnter={this.props.onDragEnter}
      onDragOver={this.props.onDragOver} onDragLeave={this.props.onDragLeave} />
    : <File key={index.toString()} data={item} caption={this.props.caption}
      directoryHome={this.props.directoryHome}
      settings={this.props.settings}
      onDeleteFile={this.props.onDeleteFile}/>)
  }
  render() {
    return <div>
      <BoxHeader settings={this.props.settings}></BoxHeader>
      <BoxList settings={this.props.settings} data={this.props.directory} items={this.setItemList()}
        onDrop={this.props.onDrop}
        onDragEnter={this.props.onDragEnter}
        onDragOver={this.props.onDragOver}
        onDragLeave={this.props.onDragLeave}>
      </BoxList>
    </div>
  }
};

module.exports = Box;
