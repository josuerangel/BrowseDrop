import React from 'react'
import File from '../file/File.js'
import Directory from '../Directory/'

class Box extends React.Component {
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
    return this.props.data.map((item) =>
      (item.url !== undefined)
        ? <File data={item} />
        : <Directory  data={item}
            addFile={this.addFile.bind(this)}
            onDragEnter={this.handleDragEnter.bind(this)}
            onClick={this.props.onClickDirectory} />
      )
  }
  render(){
    let items = [];
    items = this.setItemList();
    return (<div>{items}</div>)
  }
};

module.exports = Box;
