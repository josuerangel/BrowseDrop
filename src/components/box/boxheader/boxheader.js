import React from 'react'
import './boxheader.styl'

class BoxHeader extends React.Component {
  render(){
    return <div className="upb_boxheader">
      <div className="upb__boxheader__name">
        Name
      </div>
      <div className="">
        Modified
      </div>
    </div>
  }
}

module.exports = BoxHeader;
