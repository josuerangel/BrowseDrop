import React from 'react'
import {ReactDOM} from 'react-dom'
import 'babel-polyfill'
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
    if (file !== undefined) {
      _notification.file = {
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type
      }
    }
    let arrNotifications = this.state.notifications;
    arrNotifications.push(_notification);
    this.setState({notifications: arrNotifications});
    return notificationId
  }
  deleteNotification(notification) {
    let arrNotifications = this.state.notifications.filter((n) => (n.id !== notification.id));
    this.setState({notifications: arrNotifications});
  }
  callbackCore(data) {
    let arrNotifications = this.state.notifications.map((notification) => {
      if (notification.id === data.idNotification || notification.id === data.notificationId) {
        notification.type = data.status;
        notification.message = data.message;
        notification.dissmiss = 10;
      }
      return notification;
    });
    if (data.item !== undefined) {
      let newItems = this.state.items;
      data.item.animationIn = "bounceIn";
      newItems.push(data.item);
      this.setState({items: newItems});
    }
    this.setState({notifications: arrNotifications});
  }
  handleDrop(fileList, directory) {
    const self = this;
    const messageValidate = (this.props.options.config.caption.labelValidate === undefined)
      ? 'Validating'
      : this.props.options.config.caption.labelValidate;
    let settings = this.props.options.config;

    this.setState({directoryHover: null});
    this.addNotification({
      type: 'info',
      message: messageValidate
    }, fileList[0]);
    settings.directoryHome = this.directoryHome;
    setTimeout(function() {
      CoreSingleFile(directory, fileList[0], settings, self.state.items, self.notificationCounter, self.callbackCore.bind(self));
    }, 1000);
  }
  handleClickDirectory(directory) {
    this.setState({directory: directory});
  }
  handleClickMenu(directory) {
    this.setState({directory: directory})
  }
  handleDragEnter(directory) {
    this.setState({directoryHover: directory});
  }
  handleHover(directory) {
    this.setState({directoryHover: directory});
  }
  handleDragLeave(directory) {
    this.setState({directoryHover: null});
  }
  handleDeleteFile(file) {
    const self = this;
    const messageDelete = (this.props.options.config.caption.labelDelete === undefined)
      ? 'Deleting'
      : this.props.options.config.caption.labelValidate;
    const notificationId = this.addNotification({
      type: 'info',
      message: messageDelete
    }, file);

    setTimeout(function() {
      CoreDeleteFile(file, self.directoryHome, self.props.options.config, self.notificationCounter, self.callbackDeleteFile.bind(self));
    }, 1000);
  }
  callbackDeleteFile(data) {
    let arrNotifications = this.state.notifications.map((notification) => {
      if (notification.id === data.idNotification || notification.id === data.notificationId) {
        notification.type = data.status;
        notification.message = data.message;
        notification.dissmiss = 10;
      }
      return notification;
    });
    this.setState({notifications: arrNotifications});
    if (data.status === 'success') {
      let arrItems = this.state.items;
      const indexElement = arrItems.findIndex(function(item) {
        return data.item.id === item.id
      });
      arrItems[indexElement].animationIn = "bounceOut";
      this.setState({items: arrItems});
      self = this;
      setTimeout(function() {
        arrItems.splice(indexElement, 1);
        self.setState({items: arrItems});
      }, 1000);
    }
  }
  handleClickUpload(){
    this.refs.fileUpload.click();
  }
  handleSelectFile(e){
    const self = this;
    const messageValidate = (this.props.options.config.caption.labelValidate === undefined)
      ? 'Validating'
      : this.props.options.config.caption.labelValidate;
    let settings = this.props.options.config;
    settings.directoryHome = this.directoryHome;
    this.addNotification({
      type: 'info',
      message: messageValidate
    }, this.refs.fileUpload.files[0]);
    setTimeout(function() {
      CoreSingleFile(self.state.directory, self.refs.fileUpload.files[0], settings, self.state.items, self.notificationCounter, self.callbackCore.bind(self));
    }, 1000);
  }
  render() {
    const alertDrop = (this.state.directoryHover !== null)
      ? <Alert bsStyle="success" className={"upb__alert__drop"}>{"droped into " + this.state.directoryHover.name}</Alert>
      : null;
    return (
      <div className="upb_container">
        <input type="file" id="file" ref="fileUpload" onChange={this.handleSelectFile.bind(this)} style={{display:"none"}}></input>
        <Menu settings={this.props.options.config} directory={this.state.directory} directorys={this.arrDirectorys} iconHome={this.props.options.config.iconHome} onClick={this.handleClickMenu.bind(this)} onClickUpload={this.handleClickUpload.bind(this)}></Menu>
        <Box directory={this.state.directory} data={this.state.items} settings={this.props.options.config} caption={this.props.options.config.caption} directoryHome={this.directoryHome} onClickDirectory={this.handleClickDirectory.bind(this)} onDeleteFile={this.handleDeleteFile.bind(this)} onDrop={this.handleDrop.bind(this)} onDragEnter={this.handleDragEnter.bind(this)} onDragOver={this.handleHover.bind(this)} onDragLeave={this.handleDragLeave.bind(this)}></Box>
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
