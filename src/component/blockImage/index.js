import React from 'react'
import {connect} from 'react-redux'
import {renderIf} from '../../lib/util'
import OneImage from '../oneImage'
import Counter from '../counter'
import Message from '../message'

import { cardStart } from '../../action/card-action.js'
import {startMe, updateMe, gameReset } from '../../action/game-action.js'

class BlockImage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      backCardImage: '../../data/cardBack.jpg',
      centerImage: '../../data/start.png',
      images : ['../../data/apple.jpg','../../data/book.jpg','../../data/flower.jpg','../../data/tiger.jpg'],
    }
    this.startThisGame = this.startThisGame.bind(this)
    this.updateThisGame = this.updateThisGame.bind(this)
    this.handleChange = this.handleChange.bind(this)
    console.log('prpos == ', this.props)
  }

  startThisGame(e){
    e.preventDefault()
    this.props.startGame(this.props.game, this.props.card)
  }
  updateThisGame(picked, e){
    e.preventDefault()
    e.target.parentNode.parentNode.classList = 'flipper flip'
    this.props.updateGame(this.props.game, picked)
  }
  handleChange(e){
    this.props.updateGame(this.props.game)
  }
  render(){
    var allImage = []
    var combinationArray = this.props.game.combinationArray
    var count = 0
    var element, classes
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j ++){
        if(!(((i == 1) && (j == 1)) ||
            ((i == 1) && (j == 2)) ||
            ((i == 2) && (j == 1)) ||
            ((i == 2) && (j == 2)))){
          element = <OneImage
            style={{
              top: `${i * 22.5}%`,
              left: `${j * 22.5}%`,
              position: `absolute`}}
            classes={classes = !this.props.card.flip? 'flipper flip':'flipper'}
            frontImage={this.state.backCardImage}
            backImage={this.state.images[combinationArray[count]]}
            onChange={this.handleChange}
            onClick={this.updateThisGame.bind(this, combinationArray[count])}
            />
          allImage[count] = element
          count++
        }
      }
    }
    var styleCenter = {
      top: `25.5%`,
      left: `25.5%`,
      height: '48%',
      width: '48%',
      position: `absolute`,
      border: 'none',
    }
    return (
      <div className="blockImage">
        {allImage}
        {renderIf(this.props.card.counterOn,
          <div className={(this.props.counter > 0)? 'cover':'coverZ'}>
          <OneImage
          style={styleCenter}
          id={combinationArray[count]}
          classes={classes = !this.props.card.center? 'flipper flip':'flipper'}
          frontImage={this.state.centerImage}
          backImage={this.state.images[this.props.game.selected]}
          onClick={this.startThisGame}
          onChange={this.handleChange}
          /></div>)}
          {this.props.counter == 1? this.props.cardStart(this.props.card):console.log('counter = ', this.props.counter)}
          {renderIf(!this.props.card.counterOn, <Counter style={styleCenter}/>)}
          {renderIf(!this.props.card.gameOver,
            <Message message="Game Over!!"
                      style={styleCenter}
                      action={{message: 'click to restart!'}}
                      />)}
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    game: state.game,
    counter: state.counter,
    card: state.card,
  }
}

const mapDispatchToProp = (dispatch, getState) => {
  return {
    startGame: (game, card) => dispatch(startMe(game, card)),
    updateGame: (game, picked) => dispatch(updateMe(game, picked)),
    gameReset: (game) => dispatch(gameReset(game)),
    cardStart: (card) => dispatch(cardStart(card)),
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(BlockImage)
