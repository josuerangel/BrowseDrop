import React from 'react'
import BoxHeader from '../boxheader/boxheader.js'
import File from '../file/File.js'
import Directory from '../Directory/'
import FileDragAndDrop from '../FileDragAndDrop'
import classNames from 'classnames'
import './box.styl'
import ZoneDrop from '../zonedrop/zonedrop.js'

class BoxList extends ZoneDrop {
  render(){
    let directoryClass = classNames({
      'box__dragOver': this.state.isDragOver
    });
    return <div className={directoryClass}>
        <FileDragAndDrop onDrop={this.handleDrop.bind(this)}
            onDragEnter={this.handleDragEnter.bind(this)}
            onDragLeave={this.handleDragLeave.bind(this)}
             onDragOver={this.handleDragOver.bind(this)}>
             {this.props.items}
        </FileDragAndDrop>
    </div>
  }
}
class Box extends React.Component {
  constructor(){
    super();
    this.state = {
      isDragOver: false
    }
  }
  addFile(fileList, dir) {
      console.log('addFile');
      console.log(fileList);
      this.setState({txt: 'add file ' + fileList[0].name + ' en ' + dir.name});
      let inputFile = document.querySelector("#upbInputFile");
      var formData = new FormData();
      for(var x = 0, len = fileList.length; x < len; x++){
          formData.append('file' + x, fileList[x]);
      }
      fetch('/avatars', {
          method: 'POST',
          body: formData
      });
  }
  handleDragEnter(dir){
      this.setState({txt: 'drag file into' + dir.name});
  }
  handleClickDirectory(directory){
      this.setState({ id: directory.id });
  }
  setItemList() {
    console.log(this.props.directory);
    return this.props.data.map((item, index) =>
      (item.url !== undefined)
        ? <File key={index.toString()} data={item} />
        : <Directory key={index.toString()} data={item}
            onDragEnter={this.handleDragEnter.bind(this)}
            onClick={this.props.onClickDirectory}
            onDrop={this.props.onDrop}/>
      )
  }
  handleDrop(){
    console.log(this);
  }
  handleDragOver(){
    this.setState({ isDragOver: true})
  }
  render(){
    var boxClass = classNames({
        'box__dragOver': this.state.isDragOver
    });
    let items = [];
    items = this.setItemList();
    return <div className={boxClass}>
      <BoxHeader></BoxHeader>
      <BoxList items={items} onDrop={this.handleDrop.bind(this)} ></BoxList>
      <FileDragAndDrop onDrop={this.handleDrop.bind(this)}
        onDragOver={this.handleDragOver.bind(this)}>
        <div className="upb__box">{items}</div>
      </FileDragAndDrop>
    </div>
  }
};

module.exports = Box;
