import React from 'react'
import AnimateCSS from 'animate.css'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Alert from 'react-bootstrap/lib/Alert'
import './notifications.styl'
import IconFile from '../icon-file/icon-file.js'

class NotificationItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      animate: 'bounceIn'
    }
    if (this.props.dissmiss !== 0) {
      this.handleDismiss(this.props.onDelete).bind(this);
    }
  }
  componentDidMount() {
    console.log('componentDidMount: before wait...');
    setTimeout(function() {
      console.log('componentDidMount wait .... ');
    }, 2000);
    // if(this.props.dissmiss !== 0)
    //   this.handleDismiss(this.props.onDelete);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate: ', nextProps, nextState);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: ", prevProps, prevState);
    if (this.props.dissmiss !== 0)
      this.handleDismiss(this.props.onDelete);
    }
  handleDismiss(callback) {
    let time = this.props.dissmiss * 1000;
    console.log('handleDismiss: ', this.props, time);

    let props = this.props;
    let self = this;
    console.log('handleDismiss self: ', self);
    setTimeout(function() {
      console.log('inside timer');
      self.setState({animate: 'bounceOut'});
      setTimeout(function() {
        callback(props);
      }, 2000);
    }, time);
  }
  setSpinner(){
    if (this.props.type === "info")
      return <div className="containerSpinner pull-left">
			 		<div className="spinner"><div className="rect1"></div>
			 		<div className="rect2"></div><div className="rect3"></div>
		 				<div className="rect4"></div><div className="rect5"></div></div>
			 		</div>
  }
  render() {
    return <ListGroupItem className={' animated ' + this.state.animate} bsStyle={this.props.type}>
      <div className={"upb__notifications__dataFile"}>
        <div className={"upb__notifications__dataFile__icon"}>
        <IconFile name={this.props.dataFile.name}></IconFile>
        </div>
        <div className="upb__notifications__dataFile__data">
          <div className={"upb__notifications__dataFile__data__name"}>
            {this.props.dataFile.name}
          </div>
          <div className={"upb__notifications__dataFile__data__size"}>
            {this.props.dataFile.size}
          </div>
        </div>
      </div>
      <div className={"upb__notifications__action"}>
      <div className={"upb__notifications__action__message"}>{this.props.message}</div>
      <div className={"upb__notifications__action__spinner"}>
        {this.setSpinner()}
      </div>
      </div>
    </ListGroupItem>
  }
}

NotificationItem.propTypes = {
  onDelete: React.PropTypes.func,
  type: React.PropTypes.string,
  message: React.PropTypes.string,
  dissmiss: React.PropTypes.number,
  dataFile: React.PropTypes.object
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
    return this.props.notifications.map((notification, index) => <NotificationItem key={index.toString()} id={notification.id} type={notification.type} message={notification.message} dissmiss={notification.dissmiss} onDelete={this.props.onDelete} dataFile={notification.file}></NotificationItem>)
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
  notifications: React.PropTypes.array,
  onDelete: React.PropTypes.func
}
Notifications.defaultProps = {
  notifications: []
}

module.exports = Notifications;
