import React from 'react'
import './boxheader.styl'

class BoxHeader extends React.Component {
  render(){
    const columnName = (this.props.settings.caption.columnName === undefined) ? 'Name' : this.props.settings.caption.columnName;
    const columnDate = (this.props.settings.caption.columnDate === undefined) ? 'Modified' : this.props.settings.caption.columnDate;
    return <div className="upb_boxheader">
      <div className="upb__boxheader__name">
        {columnName}
      </div>
      <div className="">
        {columnDate}
      </div>
    </div>
  }
}

module.exports = BoxHeader;
