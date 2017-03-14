import React from 'react'
import Menu from '../menu/menu'
import Box from '../box/box'
import File from '../file/File'
import Directory from '../Directory'
import 'whatwg-fetch'
import './uploadbox.styl'
import {Core} from '../../logic/validations.js'
import NotificationSystem from 'react-notification-system'

class UploadBox extends React.Component {
  _notificationSystem : null
  arrDirectorys : []
  constructor(props) {
    super(props);
    this.arrDirectorys = this.props.options.Data.filter((item) => (item.url === undefined));
    let directory = this.arrDirectorys.filter((item) => (item.id === 0));
    let arrBox = this.props.options.Data.filter((item) => (item.parentId === 0));
    this.state = {
      directory: directory,
      id: 0,
      items: arrBox
    };
  }
  _addNotification(message, level = 'success') {
    this._notificationSystem.addNotification({message: message, level: level});
  }
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }
  callbackCore(data){
    console.log('callbackCore: ', data);
  }
  handleDrop(fileList, directory) {
    console.log('handleDrop:', fileList, directory);
    Core(fileList, this.props.options.config, this.state.items, this.callbackCore);
    // if (message !== undefined)
    //   this._addNotification(message);
    // let formData = new FormData();
    // for (let x = 0, len = fileList.length; x < len; x++)
    //   formData.append('file' + x, fileList[x]);
    // let self = this;
    // fetch('/avatars', {
    //   method: 'POST',
    //   body: formData
    // }).then(this.checkStatus).then(this.parseJSON).then(function(data) {
    //   console.log('success', data);
    // }).catch(function(error) {
    //   console.log('error', error);
    //   self._addNotification(error.message, 'error');
    // });
  }
  handleClickDirectory(directory) {
    this.setState({
      directory: directory,
      id: directory.id,
      items: this.props.options.Data.filter((item) => (item.parentId === directory.id))
    });
  }
  handleClickMenu(menu) {
    this.setState({
      id: menu.id,
      items: this.props.options.Data.filter((item) => (item.parentId === menu.id))
    })
  }
  render() {
    return (
      <div className="upb_container">
        <h1>UploadBox</h1>
        <Menu id={this.state.id} directory={this.state.directory} directorys={this.arrDirectorys} iconHome={this.props.options.config.iconHome} onClick={this.handleClickMenu.bind(this)}></Menu>
        <Box directory={this.state.directory} data={this.state.items} onClickDirectory={this.handleClickDirectory.bind(this)} onDrop={this.handleDrop.bind(this)}></Box>
        <NotificationSystem ref="notificationSystem"/>
      </div>
    )
  }
}

UploadBox.propTypes = {
  options: React.PropTypes.object
}
UploadBox.defaultProps = {
  option: {}
}

module.exports = UploadBox;
