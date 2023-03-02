/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Pull in all imports required for the controls within this scene.
 */
import React, {Component, useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

import {
  ViroScene,
  Viro360Image,
  ViroSkyBox,
  ViroText,
  ViroAnimations,
  ViroMaterials,
  ViroNode,
  ViroImage,
  ViroUtils,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

/**
 * The string for the pin
 */
var num = '';

/**
 * Grab our created custom controls used within this scene.
 */
var LoadingSpinner = require('./custom_controls/LoadingSpinner');
var InfoElement = require('./custom_controls/InfoElement');
var KeyboardPad = require('./KeyboardPad');

export default class OfficeTourSplashScene extends Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      showSceneItems: false,
      changesource: false,
      newpin: '',
      imgnx:
        'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_l.jpg',
      imgpx:
        'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_r.jpg',
      imgny:
        'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_d.jpg',
      imgpy:
        'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_u.jpg',
      imgnz:
        'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_b.jpg',
      imgpz:
        'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_f.jpg',
      hiddepinboard: true,
      experiense: null,
      currentpano: null,
    };
    this._clickGet = this._clickGet.bind(this);
  }

  /**
   * Renders a scene with a 360 Photo background that contains a few toggleable Info UI Elements
   * featuring iconic items like the SLUT, monorail and statue.
   */
  render() {
    return (
      <ViroScene style={styles.container}>
        <ViroSkyBox
          source={{
            nx: {
              uri: this.state.imgnx,
            },
            px: {
              uri: this.state.imgpx,
            },
            ny: {
              uri: this.state.imgny,
            },
            py: {
              uri: this.state.imgpy,
            },
            nz: {
              uri: this.state.imgnz,
            },
            pz: {
              uri: this.state.imgpz,
            },
          }}
        />
        {/*
         * Display a spinner icon while the background image is being loaded.
         * Once loaded, hide spinner and show the Info UI Elements.
         */}
        {/* <LoadingSpinner
            visible={!this.state.showSceneItems}
            position={[0, 0, -5]}
          /> */}
        {this._getKeyboard()}
      </ViroScene>
    );
  }

  /**
   * The keyboard
   */
  _getKeyboard() {
    if (this.state.hiddepinboard) {
      return (
        <ViroNode opacity={1.0}>
          <ViroText
            text="Enter lesson number!"
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 0])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
          />
          <ViroText
            text={'Pin: ' + this.state.newpin}
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 10])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
          />
          <KeyboardPad
            sendClick={this._clickGet.bind(this)}
            position={[0, 0, 0]}
          />
        </ViroNode>
      );
    } else {
      return this._createpois();
    }
  }
  /**
   * Creates pois
   */
  _getInfoControls() {
    if (this.state.currentpano) {
      return <ViroNode opacity={1.0}>{this._createpois()}</ViroNode>;
    }
  }
  /**
   * Letter key from keyboard.jr
   */
  _clickGet(c) {
    this._onClickNum(c);
  }
  _createpois() {
    console.log(
      '_createpois',
      this.state.currentpano.pois[0].position.position,
    );
    return this.state.currentpano.pois.map(poi => {
      return (
        <ViroNode key={poi.id} opacity={1.0}>
          <InfoElement
            content={(this.slutWindowCard, poi)}
            contentCardScale={[1.5, 1.5, 1]}
            position={[
              -poi.position.position.x,
              poi.position.position.y / 4,
              -poi.position.position.z,
            ]}
          />
        </ViroNode>
      );
    });
  }
  /**
   * Callback function for when image has finished loading in the Viro360Photo.
   * We then animate the main info elements into the scene through the
   * setting of state showSceneItems.
   */
  _onBackgroundPhotoLoadEnd() {
    this.setState({
      showSceneItems: true,
    });
  }

  _onClick(source) {
    console.log('Clicked!', source);
  }

  /**
   * Set/remove from pin
   */
  _onClickNum(n) {
    if (n.indexOf('backspace') > -1) {
      num = num.slice(0, -1);
      this.setState({newpin: num});
    } else if (n.indexOf('enter') > -1) {
      this._getLesson(num);
    } else if (n !== 'enter' || n !== 'backspace') {
      num += n;
      this.setState({newpin: num});
    }
  }
  /**
   * Callback function for when the user taps on back button located at the
   * bottom of the scene. This pops the current scene to the previous one.
   */
  _onBackClick() {
    this.props.sceneNavigator.pop();
  }
  /**
   * Fetch experience data from schoovr
   */
  _getLesson(l) {
    fetch('https://cdn2.schoovr.com/launchbypin/' + l)
      .then(response => response.json())
      .then(json => {
        this.setState({experiense: json.data});
        this.setState({currentpano: json.data.experience.data.panos[0]});
        let newsource =
          'https://cdn2.schoovr.com/tiles/' +
          this.state.currentpano.data.name.split('.')[0] +
          '/' +
          this.state.currentpano.data.name.split('.')[0] +
          '.tiles/preview.jpg';
        this.setState({backgroundImage: newsource});
        this.setState({
          imgnx:
            'https://cdn2.schoovr.com/tiles/' +
            this.state.currentpano.data.name.split('.')[0] +
            '/' +
            this.state.currentpano.data.name.split('.')[0] +
            '.tiles/mobile_l.jpg',
        });
        this.setState({
          imgpx:
            'https://cdn2.schoovr.com/tiles/' +
            this.state.currentpano.data.name.split('.')[0] +
            '/' +
            this.state.currentpano.data.name.split('.')[0] +
            '.tiles/mobile_r.jpg',
        });
        this.setState({
          imgny:
            'https://cdn2.schoovr.com/tiles/' +
            this.state.currentpano.data.name.split('.')[0] +
            '/' +
            this.state.currentpano.data.name.split('.')[0] +
            '.tiles/mobile_d.jpg',
        });
        this.setState({
          imgpy:
            'https://cdn2.schoovr.com/tiles/' +
            this.state.currentpano.data.name.split('.')[0] +
            '/' +
            this.state.currentpano.data.name.split('.')[0] +
            '.tiles/mobile_u.jpg',
        });
        this.setState({
          imgnz:
            'https://cdn2.schoovr.com/tiles/' +
            this.state.currentpano.data.name.split('.')[0] +
            '/' +
            this.state.currentpano.data.name.split('.')[0] +
            '.tiles/mobile_b.jpg',
        });
        this.setState({
          imgpz:
            'https://cdn2.schoovr.com/tiles/' +
            this.state.currentpano.data.name.split('.')[0] +
            '/' +
            this.state.currentpano.data.name.split('.')[0] +
            '.tiles/mobile_f.jpg',
        });

        this.setState({hiddepinboard: false});
      })
      .catch(error => {
        console.error(error);
      });
  }
}

/**
 * Declare all custom flex box styles here to be reference by the
 * controls above.
 */
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldFont: {
    color: '#FFFFFF',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  poitextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    diffuseColor: '#FF0000',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },
});
/**
 * Declare all your animations here. They'll be referenced by the animation props.
 */
ViroAnimations.registerAnimations({
  fadeIn: {properties: {opacity: 1.0}, duration: 1000},
});

module.exports = OfficeTourSplashScene;
