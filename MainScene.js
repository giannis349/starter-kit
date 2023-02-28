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
 * Set all the images and assets required in this scene.
 */
// var backgroundImage = require('./milan.jpeg');
// var imgnx =
//   'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_l.jpg';
// var imgpx =
//   'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_r.jpg';
// var imgny =
//   'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_b.jpg';
// var imgpy =
//   'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_u.jpg';
// var imgnz =
//   'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_b.jpg';
// var imgpy =
//   'https://cdn2.schoovr.com/tiles/1619614957270akila_ninomiya-00272072_20110325124333/1619614957270akila_ninomiya-00272072_20110325124333.tiles/mobile_f.jpg';
var source1 =
  'https://cdn2.schoovr.com/360videos/1619696195988360tms-00199254_Bartolome_7_360.jpg';
var source2 =
  'https://cdn2.schoovr.com/360videos/1670588227228C.-Newgrange.jpg';
// var backgroundImage = source1;
var monorailInfoCard = require('./res/infocard_monorail.png');
var statueWindowCard = require('./res/infocard_statue.png');
var slutWindowCard = require('./res/infocard_slut.png');
var backImage = require('./res/icon_back.png');
var remnum = require('./res/68.png');
var getlesimg = require('./res/360.png');
var num = '';

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
      backgroundImage: source1,
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
    };

    // bind `this` to functions
    this._getInfoControls = this._getInfoControls.bind(this);
    this._onBackClick = this._onBackClick.bind(this);
    this._onBackgroundPhotoLoadEnd = this._onBackgroundPhotoLoadEnd.bind(this);
    setTimeout(() => {
      this.setState({backgroundImage: source2});
      // fetch('https://cdn2.schoovr.com/launchbypin/60266')
      //   .then(response => response.json())
      //   .then(json => {
      //     console.log('res');
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    }, 5000);
  }

  /**
   * Renders a scene with a 360 Photo background that contains a few toggleable Info UI Elements
   * featuring iconic items like the SLUT, monorail and statue.
   */
  render() {
    if (this.state.hiddepinboard) {
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
          {/* <Viro360Image
          source={{uri: this.state.backgroundImage}}
          onLoadEnd={this._onBackgroundPhotoLoadEnd}
        /> */}
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
          <ViroText
            text="1"
            width={6}
            height={1}
            position={polarToCartesian([-2, -10, 20])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('1'), timeToFuse: 1000}}
          />
          <ViroText
            text="2"
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 20])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('2'), timeToFuse: 1000}}
          />
          <ViroText
            text="3"
            width={6}
            height={1}
            position={polarToCartesian([-2, 10, 20])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('3'), timeToFuse: 1000}}
          />
          <ViroText
            text="4"
            width={6}
            height={1}
            position={polarToCartesian([-2, -10, 30])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('4'), timeToFuse: 1000}}
          />
          <ViroText
            text="5"
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 30])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('5'), timeToFuse: 1000}}
          />
          <ViroText
            text="6"
            width={6}
            height={1}
            position={polarToCartesian([-2, 10, 30])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('6'), timeToFuse: 1000}}
          />
          <ViroText
            text="7"
            width={6}
            height={1}
            position={polarToCartesian([-2, -10, 40])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('7'), timeToFuse: 1000}}
          />
          <ViroText
            text="8"
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 40])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('8'), timeToFuse: 1000}}
          />
          <ViroText
            text="9"
            width={6}
            height={1}
            position={polarToCartesian([-2, 10, 40])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('9'), timeToFuse: 1000}}
          />
          <ViroImage
            height={0.3}
            width={0.27}
            position={polarToCartesian([-2, -14, 48])}
            source={getlesimg}
            onFuse={{callback: this._onClickNum('getlesson'), timeToFuse: 1000}}
          />
          <ViroText
            text="0"
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 50])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
            onFuse={{callback: this._onClickNum('0'), timeToFuse: 1000}}
          />
          <ViroImage
            height={0.3}
            width={0.3}
            position={polarToCartesian([-2, 14, 48])}
            source={remnum}
            onFuse={{callback: this._onClickNum('remove'), timeToFuse: 1000}}
          />
          {/*
           * Display a spinner icon while the background image is being loaded.
           * Once loaded, hide spinner and show the Info UI Elements.
           */}
          {/* <LoadingSpinner
            visible={!this.state.showSceneItems}
            position={[0, 0, -5]}
          /> */}
        </ViroScene>
      );
    } else {
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
          {/* <Viro360Image
          source={{uri: this.state.backgroundImage}}
          onLoadEnd={this._onBackgroundPhotoLoadEnd}
        /> */}

          {/*
           * Display a spinner icon while the background image is being loaded.
           * Once loaded, hide spinner and show the Info UI Elements.
           */}
          {/* <LoadingSpinner
          visible={!this.state.showSceneItems}
          position={[0, 0, -5]}
        /> */}

          {this._getInfoControls()}
        </ViroScene>
      );
    }
  }

  /**
   * Displays a set of InfoElement controls representing several POI locations
   * within this scene, and as well as a back button at the bottom of the scene.
   */
  _getInfoControls() {
    console.log('_getInfoControls');
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
          position={polarToCartesian([-2, 0, 50])}
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

  _onClick(source) {
    console.log('Clicked!', source);
  }
  _onClickNum(n) {
    return source => {
      if (n.indexOf('remove') > -1) {
        num = num.slice(0, -1);
        this.setState({newpin: num});
      } else if (n.indexOf('getlesson') > -1) {
        this._getLesson(num);
      } else if (n !== 'getlesson' || n !== 'remove') {
        num += n;
        this.setState({newpin: num});
        console.log('2', n);
      }
    };
  }
  /**
   * Callback function for when the user taps on back button located at the
   * bottom of the scene. This pops the current scene to the previous one.
   */
  _onBackClick() {
    this.props.sceneNavigator.pop();
  }
  _getLesson(l) {
    console.log('getlesson', l);
    fetch('https://cdn2.schoovr.com/launchbypin/60266')
      .then(response => response.json())
      .then(json => {
        console.log('res', json.data.experience.data.panos[0].data.name);
        let pano = json.data.experience.data.panos[0];
        let newsource =
          'https://cdn2.schoovr.com/tiles/' +
          pano.data.name.split('.')[0] +
          '/' +
          pano.data.name.split('.')[0] +
          '.tiles/preview.jpg';
        this.setState({backgroundImage: newsource});
        this.setState({
          imgnx:
            'https://cdn2.schoovr.com/tiles/' +
            pano.data.name.split('.')[0] +
            '/' +
            pano.data.name.split('.')[0] +
            '.tiles/mobile_l.jpg',
        });
        this.setState({
          imgpx:
            'https://cdn2.schoovr.com/tiles/' +
            pano.data.name.split('.')[0] +
            '/' +
            pano.data.name.split('.')[0] +
            '.tiles/mobile_r.jpg',
        });
        this.setState({
          imgny:
            'https://cdn2.schoovr.com/tiles/' +
            pano.data.name.split('.')[0] +
            '/' +
            pano.data.name.split('.')[0] +
            '.tiles/mobile_d.jpg',
        });
        this.setState({
          imgpy:
            'https://cdn2.schoovr.com/tiles/' +
            pano.data.name.split('.')[0] +
            '/' +
            pano.data.name.split('.')[0] +
            '.tiles/mobile_u.jpg',
        });
        this.setState({
          imgnz:
            'https://cdn2.schoovr.com/tiles/' +
            pano.data.name.split('.')[0] +
            '/' +
            pano.data.name.split('.')[0] +
            '.tiles/mobile_b.jpg',
        });
        this.setState({
          imgpz:
            'https://cdn2.schoovr.com/tiles/' +
            pano.data.name.split('.')[0] +
            '/' +
            pano.data.name.split('.')[0] +
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
