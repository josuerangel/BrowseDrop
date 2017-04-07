import React from 'react'
import { ReactDOM } from 'react-dom'
import Menu from '../menu/menu'
import Box from '../box/box'
import './uploadbox.styl'
import {Core, CoreSingleFile} from '../../logic/core.js'
import {CoreDeleteFile} from '../../logic/deleteFile.js'
import Notifications from '../notifications/notifications.js'
import Alert from 'react-bootstrap/lib/Alert'

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

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
      directoryHover: null,
      directory: directory,
      id: 0,
      items: this.arrDataOrinal,
      notifications: []
    };
  }
  addNotification(options, file) {
    const notificationId = this.notificationCounter++;
    let _notification = {
      id: this.notificationCounter,
      type: options.type,
      message: options.message
    };
    if (file !== undefined){
      console.log('addNotification file: ', file);
      _notification.file = {
        name : file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type
      }
    }
    let arrNotifications = this.state.notifications;
    arrNotifications.push(_notification);
    this.setState({ notifications: arrNotifications });
    console.log('addNotification finish: ', options);
    return notificationId
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
    this.setState({ directoryHover: null });
    this.addNotification({type: 'info', message: 'Validando' }, fileList[0]);
    console.log('handleDrop counter', this.notificationCounter);
    let settings = this.props.options.config;
    settings.directoryHome = this.directoryHome;
    console.log('handleDrop before call CoreSingleFile: ');
    setTimeout(function(){
      CoreSingleFile(directory, fileList[0], settings, self.state.items, self.notificationCounter, self.callbackCore.bind(self));
    },1000);
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
  handleDragEnter(directory){
    this.setState({ directoryHover: directory });
  }
  handleHover(directory){
    this.setState({ directoryHover: directory });
  }
  handleDragLeave(directory){
    this.setState({ directoryHover: null });
  }
  handleDeleteFile(file){
    const notificationId = this.addNotification({type: 'info', message: 'Eliminando' }, file);
    setTimeout(function(){
      CoreDeleteFile(file, this.directoryHome, this.props.options.config, function(data){
        console.log('termina delete', data);
        console.log('notificationId: ', notificationId);
      });
    },1000);
  }

  render() {
    const alertDrop = (this.state.directoryHover !== null)
      ? <Alert bsStyle="success" className={"upb__alert__drop"}>{"droped into " + this.state.directoryHover.name}</Alert>
      : null;
    return (
      <div className="upb_container">
        {alertDrop}
        <Menu directory={this.state.directory} directorys={this.arrDirectorys} iconHome={this.props.options.config.iconHome} onClick={this.handleClickMenu.bind(this)}></Menu>
        <Box directory={this.state.directory} data={this.state.items}
          settings={this.props.options.config}
          caption={this.props.options.config.caption}
          directoryHome={this.directoryHome}
          onClickDirectory={this.handleClickDirectory.bind(this)}
          onDeleteFile={this.handleDeleteFile.bind(this)}
          onDrop={this.handleDrop.bind(this)}
          onDragEnter={this.handleDragEnter.bind(this)}
          onDragOver={this.handleHover.bind(this)}
          onDragLeave={this.handleDragLeave.bind(this)}>
        </Box>
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
