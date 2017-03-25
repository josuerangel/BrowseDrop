import React from 'react'
import { ReactDOM } from 'react-dom'
import Menu from '../menu/menu'
import Box from '../box/box'
import './uploadbox.styl'
import {Core, CoreSingleFile} from '../../logic/core.js'
import Notifications from '../notifications/notifications.js'

class UploadBox extends React.Component {
  arrDataOrinal : []
  arrDirectorys : []
  notificationCounter : null
  directoryHome : {}
  constructor(props) {
    super(props);
    this.arrDataOrinal = this.props.options.Data;
    this.notificationCounter = 0;
    this.arrDirectorys = this.arrDataOrinal.filter((item) => (item.type === "directory"));
    let directory = this.arrDirectorys.filter((item) => (item.id === 0))[0];
    this.directoryHome = directory;
    this.state = {
      directory: directory,
      id: 0,
      items: this.arrDataOrinal,
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
    console.log('addNotification finish: ', options);
  }
  deleteNotification(notification){
    console.log('deleteNotification: ', notification);
    let arrNotifications = this.state.notifications.filter((n) => (n.id !== notification.id));
    console.log('deleteNotification new state: ', arrNotifications);
    this.setState({ notifications: arrNotifications });
  }
  callbackCore(data) {
    console.log('callbackCore: ', data);
    let arrNotifications = this.state.notifications.map((notification) => {
      console.log('callbackCore compare: ', notification, data);
      if(notification.id === data.idNotification || notification.id === data.notificationId){
        console.log('callbackCore modify: ', data);
        notification.type = data.status;
        notification.message = data.message;
        notification.dissmiss = 10;
      }
      return notification;
    });
    if (data.item !== undefined){
      let newItems = this.state.items;
      data.item.animationIn = "bounceIn";
      newItems.push(data.item);
      console.log('callbackCore newItems: ', newItems);
      this.setState({ items: newItems });
    }
    console.log('callbackCore notifications: ', arrNotifications);
    this.setState({ notifications: arrNotifications });
  }
  handleDrop(fileList, directory) {
    const self = this;
    this.addNotification({type: 'info', message: 'enviando archivo ' + fileList[0].name });
    console.log('handleDrop counter', this.notificationCounter);
    let settings = this.props.options.config;
    settings.directoryHome = this.directoryHome;
    console.log('handleDrop before call CoreSingleFile: ');
    setTimeout(function(){
      CoreSingleFile(directory, fileList[0], settings, self.state.items, self.notificationCounter, self.callbackCore.bind(self));
    },2000);
  }
  handleClickDirectory(directory) {
    this.setState({
      directory: directory
    });
  }
  handleClickMenu(directory) {
    this.setState({
      directory: directory
    })
  }
  render() {
    return (
      <div className="upb_container">
        <Menu directory={this.state.directory} directorys={this.arrDirectorys} iconHome={this.props.options.config.iconHome} onClick={this.handleClickMenu.bind(this)}></Menu>
        <Box directory={this.state.directory} data={this.state.items} onClickDirectory={this.handleClickDirectory.bind(this)} onDrop={this.handleDrop.bind(this)}></Box>
        <Notifications notifications={this.state.notifications} onDelete={this.deleteNotification.bind(this)}></Notifications>
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
