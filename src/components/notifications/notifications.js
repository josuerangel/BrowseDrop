import React from 'react'
import PropTypes from 'prop-types'
import AnimateCSS from 'animate.css'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Alert from 'react-bootstrap/Alert'
import './notifications.styl'
import IconFile from '../icon-file/icon-file.js'

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      type: this.props.type,
      animate: 'bounceIn',
      show: true
    }
    this.handleDismiss = this.handleDismiss.bind(this);
    if (this.props.dissmiss !== 0) {
      this.handleDismiss(this.props.onDelete);
    }
  }
  componentWillUnmount() {
    if (process.env.NODE_ENV !== 'production')
      console.log('componentWillUnmount clearTimeout: ', this.timeout);
    clearTimeout(this.timeout);
  }
  componentWillUpdate(nextProps, nextState) {
    if (process.env.NODE_ENV !== 'production')
      console.log('componentWillUpdate: ', nextProps, nextState);
    }
  componentDidUpdate(prevProps, prevState) {
    if (process.env.NODE_ENV !== 'production'){
      console.log("componentDidUpdate: ", prevProps, prevState);
      console.log("componentDidUpdate: ", this.props);
    }
    if (this.props.dissmiss !== 0 && this.state.show != false)
      this.handleDismiss(this.props.onDelete);
    }
  handleDismiss(callback) {
    if (this._calledComponentWillUnmount)
      return;
    let time = this.props.dissmiss * 1000;
    if (process.env.NODE_ENV !== 'production')
      console.log('handleDismiss: ', this.props, time);

    let props = this.props;
    let self = this;
    if (process.env.NODE_ENV !== 'production')
      console.log('handleDismiss self: ', self);
    this.timeout = setTimeout(function() {
      if (process.env.NODE_ENV !== 'production')
        console.log('inside timer self,', self);
      if (self.refs.myNotification)
        self.setState({animate: 'bounceOut', show: false});
      setTimeout(function() {
        if (process.env.NODE_ENV !== 'production')
          console.log('handleDismiss launch callback props: ', props);
        callback(props);
      }, 2000);
    }, time);
  }
  setSpinner() {
    if (this.props.type === "info")
      return <div className="containerSpinner pull-left">
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
  }
  formatBytes(bytes,decimals) {
     if(bytes == 0) return '0 Bytes';
     var k = 1024,
         dm = decimals + 1 || 3,
         sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
         i = Math.floor(Math.log(bytes) / Math.log(k));
     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)).toFixed(2) + ' ' + sizes[i];
  }
  parseMessage(message){
    console.log('parseMessage: ', message);
    console.log('parseMessage typeof: ', typeof message);
    if (message.map != undefined)
      return message.map((item, key) => {
        return <span className={"upb__notifications__multiline"} key={key}>{item}</span>
      });
    return message;
  }
  render() {
    const sizeFile = (this.props.dataFile.size === undefined)
      ? null
      : (<div className={"upb__notifications__dataFile__data__size"}>
        {this.formatBytes(this.props.dataFile.size)}
      </div>)

    return <ListGroupItem ref="myNotification" className={' animated ' + this.state.animate} bsStyle={this.props.type}>
      <div className={"upb__notifications__dataFile"}>
        <div className={"upb__notifications__dataFile__icon"}>
          <IconFile name={this.props.dataFile.name}></IconFile>
        </div>
        <div className="upb__notifications__dataFile__data">
          <div className={"upb__notifications__dataFile__data__name"}>
            {this.props.dataFile.name}
          </div>
          {sizeFile}
        </div>
      </div>
      <div className={"upb__notifications__action"}>
        <div className={"upb__notifications__action__message"}>
          {this.parseMessage(this.props.message)}
        </div>
        <div className={"upb__notifications__action__spinner"}>
          {this.setSpinner()}
        </div>
      </div>
    </ListGroupItem>
  }
}

NotificationItem.propTypes = {
  onDelete: PropTypes.func,
  type: PropTypes.string,
  message: PropTypes.string,
  dissmiss: PropTypes.number,
  dataFile: PropTypes.object
}

NotificationItem.defaultProps = {
  type: 'success',
  message: '',
  dissmiss: 0
}

class Notifications extends React.Component {
  constructor(props) {
    super(props)
  }
  setNotifications() {
    if (this.props.notifications.length === 0)
      return [];
    return this.props.notifications.map((notification, index) => <NotificationItem key={notification.id} id={notification.id} type={notification.type} message={notification.message} dissmiss={notification.dissmiss} onDelete={this.props.onDelete} dataFile={notification.file}></NotificationItem>)
  }
  render() {
    return <div className="upb__notifications__wrapper">
      <ListGroup>
        {this.setNotifications()}
      </ListGroup>
    </div>
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array,
  onDelete: PropTypes.func
}
Notifications.defaultProps = {
  notifications: []
}

export default Notifications;
