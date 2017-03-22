import React from 'react'
import Menu from '../menu/menu'
import Box from '../box/box'
import './uploadbox.styl'
import {Core, CoreSingleFile} from '../../logic/core.js'
import Notifications from '../notifications/notifications.js'

class UploadBox extends React.Component {
  arrDirectorys : []
  notificationCounter : null
  directoryHome : {}
  constructor(props) {
    super(props);
    this.notificationCounter = 0;
    this.arrDirectorys = this.props.options.Data.filter((item) => (item.type === "directory"));
    let directory = this.arrDirectorys.filter((item) => (item.id === 0));
    console.log('uploadbox constructor directory', directory);
    this.directoryHome = directory[0];
    console.log('uploadbox constructor directoryHome', this.directoryHome);
    let arrBox = this.props.options.Data.filter((item) => (item.parentId === 0));
    this.state = {
      directory: directory,
      id: 0,
      items: arrBox,
      notifications: []
    };
  }
  addNotification(options) {
    this.notificationCounter++;
    let _notification = {
      id: this.notificationCounter,
      type: options.type,
      message: options.message
    };
    let arrNotifications = this.state.notifications;
    arrNotifications.push(_notification);
    this.setState({ notifications: arrNotifications });
  }
  deleteNotification(notification){
    console.log('deleteNotification: ', notification);
    let arrNotifications = this.state.notifications.filter((n) => (n.id !== notification.id));
    console.log('deleteNotification new state: ', arrNotifications);
    this.setState({ notifications: arrNotifications });
  }
  callbackCore(data) {
    let arrNotifications = this.state.notifications.map((notification) => {
      console.log('callbackCore compare: ', notification, data);
      if(notification.id === data.idNotification){
        console.log('callbackCore modify: ', data);
        notification.type = data.status;
        notification.message = data.message;
        notification.dissmiss = 10;
      }
      return notification;
    });
    console.log('callbackCore: ', arrNotifications);
    this.setState({ notifications: arrNotifications });
  }
  handleDrop(fileList, directory) {
    this.addNotification({type: 'info', message: 'enviando archivo ' + fileList[0].name });
    console.log('handleDrop counter', this.notificationCounter);
    let settings = this.props.options.config;
    settings.directoryHome = this.directoryHome;
    CoreSingleFile(directory, fileList[0], settings, this.state.items, this.notificationCounter, this.callbackCore.bind(this));
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
        <Notifications notifications={this.state.notifications} onDelete={this.deleteNotification.bind(this)}></Notifications>
        <Menu id={this.state.id} directory={this.state.directory} directorys={this.arrDirectorys} iconHome={this.props.options.config.iconHome} onClick={this.handleClickMenu.bind(this)}></Menu>
        <Box directory={this.state.directory} data={this.state.items} onClickDirectory={this.handleClickDirectory.bind(this)} onDrop={this.handleDrop.bind(this)}></Box>
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
