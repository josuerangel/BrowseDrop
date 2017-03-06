import React from 'react';
//import css from '../components/file/file.css';
//import './File.css';
import './File.styl'

class File extends React.Component {
  render () {
    return <div className="boxList__item--display">
      <ul className="listInfoFile--display">
        <li className="listInfoFileItem--display"><a href={this.props.data.urlDownload}>{this.props.data.name}</a></li>
        <li className="listInfoFileItem--display">{this.props.data.date}</li>
      </ul>
    </div>
  }
};

module.exports = File
