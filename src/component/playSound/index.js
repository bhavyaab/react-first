'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import { updateGame } from '../../action/game-action.js'

class PlaySound extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }
    this.playAudio = this.playAudio.bind(this)
    this.loopAudio = this.loopAudio.bind(this)
    this.stopAudio = this.stopAudio.bind(this)
    this.muteAudio = this.muteAudio.bind(this)
  }

  playAudio(){
    if(this.props.mute) return
    this.props.audio.loop = false
    this.props.audio.play()
  }
  loopAudio(e){
    e.preventDefault()
    if(this.props.mute) return
    this.props.audio.loop = true
    this.props.audio.play()
  }
  stopAudio(e){
    e.preventDefault()
    this.props.audio.pause()
  }
  muteAudio(e){
    e.preventDefault()
    this.props.mute = !this.props.mute
    this.props.audio.pause()
    // if(!mute) document.getElementById('soundIcon').src = soundOn
    // if(mute)  document.getElementById('soundIcon').src = soundOff
  }
  componentDidMount() {
    this.props.audio = ReactDOM.findDOMNode(this.refs.audio)
    // this.props.audio.play()
  }

  render() {
    return (
      <audio ref="audio" preload="auto">
         <source src={this.props.src}></source>
      </audio>
    )
  }
}
const mapStateToProps = (state, props) => {
  return {
    mute: state.sound.mute,
  }
}

const mapDispatchToProp = (dispatch, getState) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProp)(PlaySound)