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
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroScene,
  Viro360Image,
  ViroSkyBox,
  ViroAnimations,
  ViroNode,
  ViroImage,
  ViroUtils,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

/**
 * Set all the images and assets required in this scene.
 */
// var backgroundImage = require('./milan.jpeg');
var imgnx =
  'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_l.jpg';
var source1 =
  'https://cdn2.schoovr.com/360videos/1619696195988360tms-00199254_Bartolome_7_360.jpg';
var source2 =
  'https://cdn2.schoovr.com/360videos/1670588227228C.-Newgrange.jpg';
var backgroundImage = source1;
var monorailInfoCard = require('./res/infocard_monorail.png');
var statueWindowCard = require('./res/infocard_statue.png');
var slutWindowCard = require('./res/infocard_slut.png');
var backImage = require('./res/icon_back.png');

/**
 * Grab our created custom controls used within this scene.
 */
var LoadingSpinner = require('./custom_controls/LoadingSpinner');
var InfoElement = require('./custom_controls/InfoElement');

export default class OfficeTourSplashScene extends Component {
  constructor() {
    super();

    // set initial state
    this.state = {
      showSceneItems: false,
    };

    // bind `this` to functions
    this._getInfoControls = this._getInfoControls.bind(this);
    this._onBackClick = this._onBackClick.bind(this);
    this._onBackgroundPhotoLoadEnd = this._onBackgroundPhotoLoadEnd.bind(this);
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
              uri: 'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_l.jpg',
            },
            px: {
              uri: 'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_r.jpg',
            },
            ny: {
              uri: 'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_b.jpg',
            },
            py: {
              uri: 'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_u.jpg',
            },
            nz: {
              uri: 'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_b.jpg',
            },
            pz: {
              uri: 'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_f.jpg',
            },
          }}
        />
        {/* <Viro360Image
          source={{uri: backgroundImage}}
          onLoadEnd={this._onBackgroundPhotoLoadEnd}
        /> */}

        {/*
         * Display a spinner icon while the background image is being loaded.
         * Once loaded, hide spinner and show the Info UI Elements.
         */}
        <LoadingSpinner
          visible={!this.state.showSceneItems}
          position={[0, 0, -5]}
        />

        {this._getInfoControls()}
      </ViroScene>
    );
  }

  /**
   * Displays a set of InfoElement controls representing several POI locations
   * within this scene, and as well as a back button at the bottom of the scene.
   */
  _getInfoControls() {
    return (
      <ViroNode
        opacity={0.0}
        animation={{
          name: 'fadeIn',
          run: this.state.showSceneItems,
          loop: false,
        }}>
        <InfoElement
          content={slutWindowCard}
          contentCardScale={[3.67, 4, 1]}
          position={polarToCartesian([-5, 0, 0])}
          onClick={this._onClick}
        />
        <InfoElement
          content={monorailInfoCard}
          contentCardScale={[3.67, 4, 1]}
          position={polarToCartesian([-5, 77, -10])}
        />
        <InfoElement
          content={statueWindowCard}
          contentCardScale={[4, 3.95, 2]}
          position={polarToCartesian([-5, 277, 0])}
        />
        <ViroImage
          scale={[1, 1, 1]}
          position={[0, -3.5, 0]}
          rotation={[-90, 0, 0]}
          source={backImage}
          onClick={this._onClick}
        />
      </ViroNode>
    );
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

  _onClick() {
    backgroundImage = source2;
    console.log('I just Clicked!', backgroundImage);
  }
  /**
   * Callback function for when the user taps on back button located at the
   * bottom of the scene. This pops the current scene to the previous one.
   */
  _onBackClick() {
    this.props.sceneNavigator.pop();
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
});

/**
 * Declare all your animations here. They'll be referenced by the animation props.
 */
ViroAnimations.registerAnimations({
  fadeIn: {properties: {opacity: 1.0}, duration: 1000},
});

module.exports = OfficeTourSplashScene;
