import React from 'react'
import Menu from '../menu/menu'
import Box from '../box/box'
import './uploadbox.styl'
import {Core, CoreSingleFile} from '../../logic/core.js'
import NotificationSystem from 'react-notification-system'
import Notifications from '../notifications/notifications.js'

class UploadBox extends React.Component {
  notificationSystem : null
  arrDirectorys : []
  constructor(props) {
    super(props);
    this.arrDirectorys = this.props.options.Data.filter((item) => (item.url === undefined));
    let directory = this.arrDirectorys.filter((item) => (item.id === 0));
    let arrBox = this.props.options.Data.filter((item) => (item.parentId === 0));
    this.state = {
      directory: directory,
      id: 0,
      items: arrBox,
      notifications: [
        {type:"error", message:"errorsin"}
      ]
    };
  }
  addNotification(options) {
    let defaultOptions = {
      level: 'success',
      autoDismiss: 10
    }
    let setup = Object.assign(defaultOptions, options)
    this.notificationSystem.addNotification(setup);
  }
  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }
  callbackCore(data) {
    this.addNotification(data);
    let temp = this.state.notifications;
    temp.push({ type: "success", message: "desde aca"});
    this.setState({ notifications: temp });

    let temp2 = this.state.notifications.map(function(noti) {
      console.log('iteracion', noti, data);
      if(noti.id === data.notificationId)
        console.log('find', noti);
    });
    this.setState({ notifications: temp2 });
  }
  handleDrop(fileList, directory) {
    let notification = {
      title: 'Send',
      message: 'sending file ' + fileList[0].name + 'in directory ' + directory.name,
      level: 'info'
    }
    //this.addNotification(notification);
    //Core(fileList, this.props.options.config, this.state.items, this.callbackCore.bind(this));

    let temp = this.state.notifications;
    temp.push({ id: 0, type: "success", message: "enviando archivin"});
    this.setState({ notifications: temp });
    CoreSingleFile(fileList[0], this.props.options.config, this.state.items, 0, this.callbackCore.bind(this));
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
        <Notifications notifications={this.state.notifications}></Notifications>
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
