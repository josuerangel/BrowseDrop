import React from 'react'
import Menu from '../menu/menu'
import Box from '../box/box'
import File from '../file/File'
import Directory from '../Directory'
import 'whatwg-fetch'
import './uploadbox.styl'
import { Core } from '../../logic/validations.js'
import NotificationSystem from 'react-notification-system'

class UploadBox extends React.Component {
  _notificationSystem: null
  constructor() {
    super();
    this.state = {
      directory: {},
      id: 0,
      txt: 'this is the initial state txt',
      items: []
    }
  }
  _addNotification(message, level = 'success') {
      this._notificationSystem.addNotification({
        message: message,
        level: level
      });
  }
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this.arrDirectorys = this.props.options.Data.filter((item) => (item.url === undefined));
    let arrBox = this.props.options.Data.filter((item) => (item.parentId === this.state.id));
    let directory = this.arrDirectorys.filter((item) => (item.id === 0));
    this.setState({
        items: arrBox,
        directory: directory[0]
    });
  }
  update(e) {
    this.setState({txt: e.target.value})
  }
  addFile(fileList, dir) {
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
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
  parseJSON(response) {
    return response.json()
  }
  handleDrop(fileList, directory){
    let message = Core(fileList, this.props.options.config, this.state.items);
    if (message !== undefined) this._addNotification(message);
    this.setState({txt: 'add file ' + fileList[0].name + ' en ' + directory.name});
    let formData = new FormData();
    for(let x = 0, len = fileList.length; x < len; x++)
        formData.append('file' + x, fileList[x]);
    let self = this;
    fetch('/avatars', {
        method: 'POST',
        body: formData
    }).then(this.checkStatus)
    .then(this.parseJSON)
    .then(function(data){
      console.log('success', data);
    })
    .catch(function(error){
      console.log('error', error);
      console.log(error);
      self._addNotification(error.message, 'error');
    });
  }
  handleClickDirectory(directory){
      this.setState({
          id: directory.id,
          items: this.props.options.Data.filter((item) => (item.parentId === directory.id))
      });
  }
  handleClickMenu(menu){
      this.setState({
          id: menu.id,
          items: this.props.options.Data.filter((item) => (item.parentId === menu.id))
      })
  }
  setItemList() {
      return this.state.items.map((item, index) => (item.urlDownload !== undefined)
          ? <File data={item}/>
          : <Directory data={item} addFile={this.addFile.bind(this)}
            onDragEnter={this.handleDragEnter.bind(this)}
            onClick={this.handleClickDirectory.bind(this)} />);
  }
  render() {
      let txt = this.props.txt
      let num = this.props.numero
      //let itemList = this.setItemList();
      return (
          <div className="upb_container">
              <h1>{txt}</h1>
              <input type="text" onChange={this.update.bind(this)}/>
              <h1>{this.state.txt}</h1>
              <h1>{this.state.id}</h1>
              <Menu id={this.state.id} directorys={this.arrDirectorys}
                  iconHome={this.props.options.config.iconHome} onClick={this.handleClickMenu.bind(this)} ></Menu>
                <Box directory={this.state.directory} data={this.state.items}
                  onClickDirectory={this.handleClickDirectory.bind(this)}
                  onDrop={this.handleDrop.bind(this) }></Box>
              <NotificationSystem ref="notificationSystem" />
          </div>
      )
  }
}

UploadBox.propTypes = {
    txt: React.PropTypes.string,
    options: React.PropTypes.object,
    dataFilesAndDirs: React.PropTypes.array
}

UploadBox.defaultProps = {
    txt: "Default TXT prop",
    option: {},
    dataFilesAndDirs: []
}

module.exports = UploadBox;
