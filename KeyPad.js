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
var Image0 = require('./res/0.png');
var qImage = require('./res/icons8-circled-q-50.png');
var wImage = require('./res/icons8-circled-w-50.png');
var eImage = require('./res/icons8-circled-e-50.png');
var rImage = require('./res/icons8-circled-r-50.png');
var tImage = require('./res/icons8-circled-t-50.png');
var yImage = require('./res/icons8-circled-y-50.png');
var uImage = require('./res/icons8-circled-u-50.png');
var iImage = require('./res/icons8-circled-i-50.png');
var oImage = require('./res/icons8-circled-o-50.png');
var pImage = require('./res/icons8-circled-p-50.png');
var papakiImage = require('./res/papaki.png');
var aImage = require('./res/icons8-circled-a-50.png');
var sImage = require('./res/icons8-circled-s-50.png');
var dImage = require('./res/icons8-circled-d-50.png');
var fImage = require('./res/icons8-circled-f-50.png');
var gImage = require('./res/icons8-circled-g-50.png');
var hImage = require('./res/icons8-circled-h-50.png');
var jImage = require('./res/icons8-circled-j-50.png');
var kImage = require('./res/icons8-circled-k-50.png');
var lImage = require('./res/icons8-circled-l-50.png');
var zImage = require('./res/icons8-circled-z-50.png');
var xImage = require('./res/icons8-circled-x-50.png');
var cImage = require('./res/icons8-circled-c-50.png');
var vImage = require('./res/icons8-circled-v-50.png');
var bImage = require('./res/icons8-circled-b-50.png');
var nImage = require('./res/icons8-circled-n-50.png');
var mImage = require('./res/icons8-circled-m-50.png');
var enterImage = require('./res/enter.png');
var backspaceImage = require('./res/backspace.png');
var spaceImage = require('./res/space.png');

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
          width={0.2}
          height={0.23}
          opacity={1.0}
          position={[0, -0.2, -0.27]}
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
