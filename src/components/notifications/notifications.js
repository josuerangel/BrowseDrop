import React from 'react'
import './notifications.styl'

class NotificationItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: this.props.type
    }
  }
  render(){
    return <div className="upb__itemnotification__wrapper">
      <div className={'upb__notification__' + this.props.type}>
        {this.props.message}
      </div>
    </div>
  }
}

NotificationItem.propTypes = {
  type: React.PropTypes.String,
  message: React.PropTypes.String
}

class Notifications extends React.Component {
  constructor(props) {
    super(props)
  }
  setNotifications(){
    return this.props.notifications.map((noti) => <NotificationItem type={noti.type} message={noti.message}></NotificationItem>)
  }
  render(){
    return <div className="upb__notifications__wrapper">
      <NotificationItem type={"success"} message={"holitas"}></NotificationItem>
      {this.setNotifications()}
    </div>
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.Array
}
Notifications.defaultProps = {
  notifications: []
}

module.exports = Notifications;
