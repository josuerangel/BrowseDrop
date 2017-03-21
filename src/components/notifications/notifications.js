import React from 'react'
import AnimateCSS from 'animate.css'
import './notifications.styl'

class NotificationItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: this.props.type,
      animate: 'bounceIn'
    }
    if(this.props.dissmiss !== 0)
      this.handleDismiss(this.props.onDelete).bind(this);
  }
  componentDidMount(){
    if(this.props.dissmiss !== 0)
      this.handleDismiss(this.props.onDelete);
  }
  componentWillUpdate(nextProps, nextState){
    console.log('componentWillUpdate: ',nextProps, nextState);
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.dissmiss !== 0)
      this.handleDismiss(this.props.onDelete);
  }
  handleDismiss(callback){
    let time = this.props.dissmiss * 1000;
    console.log('handleDismiss: ', this.props, time);
    let props = this.props;
    self = this;
    setTimeout(function(){
      console.log('inside timer');
      self.setState({animate: 'bounceOut'});
      setTimeout(function(){
        callback(props);
      }, 2000);
    }, time);
  }
  render(){
    return <div className="upb__itemnotification__wrapper">
      <div className={'upb__notification__' + this.props.type + ' animated ' + this.state.animate}>
        {this.props.message}
      </div>
    </div>
  }
}

NotificationItem.propTypes = {
  onDelete: React.PropTypes.func,
  type: React.PropTypes.string,
  message: React.PropTypes.string,
  dissmiss: React.PropTypes.number
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
  setNotifications(){
    console.log('notificationSystem: ', this.props.notifications);
    if (this.props.notifications.length === 0) return [];
    return this.props.notifications.map((notification, index) => <NotificationItem key={index.toString()} id={notification.id} type={notification.type} message={notification.message} dissmiss={notification.dissmiss} onDelete={this.props.onDelete}></NotificationItem>)
  }
  render(){
    return <div className="upb__notifications__wrapper">
      {this.setNotifications()}
    </div>
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.array,
  onDelete : React.PropTypes.func
}
Notifications.defaultProps = {
  notifications: []
}

module.exports = Notifications;
