import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../menu/menu'
import Box from '../box/box'
import './uploadbox.styl'
import {Core, CoreSingleFile} from '../../logic/core.js'
import {CoreDeleteFile} from '../../logic/deleteFile.js'
import Notifications from '../notifications/notifications.js'
import Alert from 'react-bootstrap/lib/Alert'

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

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

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
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
        return i;
      }
    }
    return -1;
  };
}

class BrowseDrop extends React.Component {
  arrDataOrinal : []
  arrDirectories : []
  notificationCounter : null
  directoryHome : {}
  addFile
  setItems: null
  setDirectory: null
  getItems: null
  constructor(props) {
    super(props);
    this.addFile = this.handleAddFile;
    this.setItems = this.handleSetItems;
    this.setDirectory = this.handleSetDirectory;
    this.getItems = this.handleGetItems;
    this.arrDataOrinal = this.props.options.Data;
    this.notificationCounter = -1;
    this.arrDirectories = this.arrDataOrinal.filter((item) => (item.type === "directory"));
    let directory = this.arrDirectories.filter((item) => (item.id === 0))[0];
    this.directoryHome = directory;
    this.state = {
      directoryHover: null,
      directory: directory,
      id: 0,
      items: this.arrDataOrinal,
      notifications: []
    };
  }

  handleGetItems(){
    return this.state.items;
  }

  handleSetDirectory(directory){
    this.setState({ directory: directory });
  }

  handleSetItems(newItems) {
    this.setState({items: newItems});
    if (typeof this.props.options.changeFiles == 'function'){
      const arrFile = this.state.items.filter((item) => (item.type !== "directory"));
    }
  }

  handleAddFile(item){
    let newItems = this.state.items;
    newItems.push(item);
    this.setItems(newItems);
    if (typeof this.props.options.config.afterAddFile == 'function'){
      this.props.options.config.afterAddFile(item, this.state.directory, this);
    }
  }

  deleteFile(item){
    let arrItems = this.state.items;
    const indexElement = arrItems.findIndex(function(_item) {
        return _item.id === item.id
    });
    let self = this;
    console.log('UploadBox deleteFile before delete count: ', arrItems.length);
    arrItems.splice(indexElement, 1);
    console.log('UploadBox deleteFile after delete count: ', arrItems.length);
    this.setItems(arrItems);
    if (typeof this.props.options.config.afterDeleteFile == 'function'){
      this.props.options.config.afterDeleteFile(item, this.state.directory, this);
    }
  }

  addNotification(options, file) {
    console.log('addNotification options: ', options);
    console.log('addNotification file: ', file);
    this.notificationCounter++;
    const notificationId = this.notificationCounter;
    let _notification = {
      id: this.notificationCounter,
      type: options.type,
      message: options.message
    };
    if (file !== undefined) {
      _notification.file = {
        name: file.name,
        date: file.date,
        size: file.size,
        type: file.type
      }
    }
    let arrNotifications = this.state.notifications;
    arrNotifications.push(_notification);
    this.setState({notifications: arrNotifications});
    console.log('addNotification end for file: ', file);
    return notificationId
  }
  deleteNotification(notification) {
    let arrNotifications = this.state.notifications.filter((n) => (n.id !== notification.id));
    this.setState({notifications: arrNotifications});
  }
  callbackCore(data) {
    let arrNotifications = this.state.notifications.map((notification) => {
      if (notification.id === data.idNotification || notification.id === data.notificationId) {
        console.log('callbackCore modifing notification before: ', notification, data);
        notification.type = data.status;
        notification.message = data.message;
        notification.dissmiss = (data.status != "info") ? 10 : 0;
        console.log('callbackCore modifing notification after: ', notification);
      }
      return notification;
    });
    if (data.item !== undefined) {
      //let newItems = this.state.items;
      data.item.animationIn = "bounceIn";
      //newItems.push(data.item);
      //this.setState({items: newItems});
      //this.setItems(newItems);
      this.addFile(data.item);
    }
    console.log('callbackCore notifications modified: ', arrNotifications);
    this.setState({notifications: arrNotifications});
  }
  handleDrop(fileList, directory) {
    console.log('handleDrop',this);
    if (directory.drag === false) return;
    console.log('handleDrop fileList: ', fileList);
    const self = this;
    const messageValidate = (this.props.options.config.caption.labelValidate === undefined)
      ? 'Validating'
      : this.props.options.config.caption.labelValidate;
    let settings = this.props.options.config;

    this.setState({directoryHover: null});
    for(let x = 0, len = fileList.length; x < len; x++){
      const notificationId = this.addNotification({
        type: 'info',
        message: messageValidate
      }, fileList[x]);
      settings.directoryHome = this.directoryHome;
      setTimeout(function() {
        console.log('before send CoreSingleFile notificationCounter: ', notificationId);
        CoreSingleFile(directory, fileList[x], settings, self.state.items, notificationId, self.callbackCore.bind(self));
      }, 1000);
    }
  }
  handleClickDirectory(directory) {
    this.setState({directory: directory});
    // if (this.props.options.config.afterClickDirectory != undefined)
    //   this.props.options.config.afterClickDirectory(directory);
  }
  handleClickMenu(directory) {
    this.setState({directory: directory})
  }
  handleDragEnter(directory) {
    //this.setState({directoryHover: directory});
  }
  handleHover(directory) {
    if (directory !== this.state.directoryHover && directory.drag === true)
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
      CoreDeleteFile(file, self.directoryHome, self.props.options.config, notificationId, self.callbackDeleteFile.bind(self));
    }, 1000);
  }
  callbackDeleteFile(data) {
    console.log('UploadBox callbackDeleteFile: ', data);
    let arrNotifications = this.state.notifications.map((notification) => {
      if (notification.id === data.idNotification || notification.id === data.notificationId) {
        notification.type = data.status;
        notification.message = data.message;
        notification.dissmiss = 10;
      }
      return notification;
    });
    this.setState({notifications: arrNotifications});
    console.log('UploadBox callbackDeleteFile data status: ', data.status);
    if (data.status === 'success') {
      console.log('UploadBox callbackDeleteFile entro ok');
      let arrItems = this.state.items;
      const indexElement = arrItems.findIndex(function(item) {
        return data.item.id === item.id
      });
      console.log('UploadBox callbackDeleteFile indexElement: ', indexElement);
      arrItems[indexElement].animationIn = "bounceOut";
      //this.setState({items: arrItems});
      this.setItems(arrItems);
      let self = this;
      setTimeout(function() {
        /*console.log('UploadBox callbackDeleteFile before delete count: ', arrItems.length);
        arrItems.splice(indexElement, 1);
        console.log('UploadBox callbackDeleteFile after delete count: ', arrItems.length);
        self.setState({items: arrItems});*/
        self.deleteFile(arrItems[indexElement]);
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
    const notificationId = this.addNotification({
      type: 'info',
      message: messageValidate
    }, this.refs.fileUpload.files[0]);
    setTimeout(function() {
      CoreSingleFile(self.state.directory, self.refs.fileUpload.files[0], settings, self.state.items, notificationId, self.callbackCore.bind(self));
    }, 1000);
  }
  render() {
    const messageDrop = (this.props.options.config.caption.labelDropInTo === undefined)
      ? "Drop into " : this.props.options.config.caption.labelDropInTo;
    const alertDrop = (this.state.directoryHover !== null)
      ? <Alert bsStyle="success" className={"upb__alert__drop"}>{messageDrop + this.state.directoryHover.name}</Alert>
      : null;
    return (
      <div className="upb_container">
        <input type="file" id="file" ref="fileUpload" onChange={this.handleSelectFile.bind(this)} style={{display:"none"}}></input>
        {alertDrop}
        <Menu settings={this.props.options.config} directory={this.state.directory} directories={this.arrDirectories} iconHome={this.props.options.config.iconHome} onClick={this.handleClickMenu.bind(this)} onClickUpload={this.handleClickUpload.bind(this)}></Menu>
        <Box directory={this.state.directory} data={this.state.items} settings={this.props.options.config} caption={this.props.options.config.caption} directoryHome={this.directoryHome} onClickDirectory={this.handleClickDirectory.bind(this)} onDeleteFile={this.handleDeleteFile.bind(this)} onDrop={this.handleDrop.bind(this)} onDragEnter={this.handleDragEnter.bind(this)} onDragOver={this.handleHover.bind(this)} onDragLeave={this.handleDragLeave.bind(this)}></Box>
        <Notifications notifications={this.state.notifications} onDelete={this.deleteNotification.bind(this)}></Notifications>
      </div>
    )
  }
}

BrowseDrop.propTypes = {
  options: PropTypes.object
}
BrowseDrop.defaultProps = {
  options: {}
}

module.exports = BrowseDrop;
