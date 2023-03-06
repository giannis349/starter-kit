import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

import {
  ViroScene,
  ViroFlexView,
  Viro360Image,
  ViroSkyBox,
  ViroText,
  ViroAnimations,
  ViroMaterials,
  ViroNode,
  ViroImage,
  ViroUtils,
} from 'react-viro';
var Image1 = require('./res/1.png');
var Image2 = require('./res/2.png');
var Image3 = require('./res/3.png');
var Image4 = require('./res/4.png');
var Image5 = require('./res/5.png');
var Image6 = require('./res/6.png');
var Image7 = require('./res/7.png');
var Image8 = require('./res/8.png');
var Image9 = require('./res/9.png');
var enterImage = require('./res/enter.png');
var Image0 = require('./res/0.png');
var backspaceImage = require('./res/backspace.png');

export default class KeyboardPad extends Component {
  constructor() {
    super();

    this.state = {
      keyboard: null,
      test: '',
      allKeys: [
        {id: 1, Letter: '1', img: Image1},
        {id: 2, Letter: '2', img: Image2},
        {id: 3, Letter: '3', img: Image3},
        {id: 4, Letter: '4', img: Image4},
        {id: 5, Letter: '4', img: Image5},
        {id: 6, Letter: '6', img: Image6},
        {id: 7, Letter: '7', img: Image7},
        {id: 8, Letter: '8', img: Image8},
        {id: 9, Letter: '9', img: Image9},
        {id: 38, Letter: 'backspace', img: backspaceImage},
        {id: 10, Letter: '0', img: Image0},
        {id: 39, Letter: 'enter', img: enterImage},
      ],
    };
  }

  render() {
    return (
      <ViroNode>
        <ViroFlexView
          transformBehaviors={['billboard']}
          width={0.55}
          height={0.23}
          opacity={1.0}
          position={[0, -0.3, -0.27]}
          style={styles.flexback}>
          {this._buildpad()}
        </ViroFlexView>
      </ViroNode>
    );
  }

  _buildpad() {
    console.log('test');
    return this.state.allKeys.map(val => {
      return (
        <ViroImage
          key={val.id}
          width={0.05}
          height={0.05}
          opacity={1.0}
          scale={[0.7, 0.7, 0.7]}
          position={[0, 0, 0]}
          source={val.img}
          onClick={this._onClickKey(val.Letter)}
          onFuse={{callback: this._onClickKey(val.Letter), timeToFuse: 1000}}
        />
      );
    });
  }
  _onClickKey(n) {
    return source => {
      if (n) {
        console.log('_onClickKey', n);
        this.setState({
          test: n,
        });
        this.props.sendClick(n);
      } else {
        console.log('_onClickKey_else', n);
      }
    };
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 8,
    fontFamily: 'Arial',
  },
  flexback: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(221, 214, 212, 0.81)',
    padding: 0.01,
  },
});

module.exports = KeyboardPad;
