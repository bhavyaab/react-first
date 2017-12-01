
import React from 'react'
import {connect} from 'react-redux'

import {renderIf} from '../../lib/util'

class OneImage extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  // <div className="cards"></div>
  render(){
    return (
    <div style={this.props.style} className='oneImage flip-container'>
       <div className={this.props.classes}
            onClick={this.props.onClick}
            onChange={this.props.onChange}>
          <div className="front" >
            <img style={this.props.circle} id={this.props.id} src={this.props.frontImage}/>
          </div>
          <div className="back">
             <img style={this.props.circle} src={this.props.backImage}/>
          </div>
       </div>
    </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    classes: props.classes,
    flip: state.card.flip,
  }
}

const mapDispatchToProp = (dispatch, getState) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProp)(OneImage)
