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
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';
import {io} from 'socket.io-client';
import {
  ViroScene,
  Viro360Image,
  ViroFlexView,
  ViroSkyBox,
  ViroText,
  ViroAnimations,
  ViroMaterials,
  ViroNode,
  ViroImage,
  ViroUtils,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var source1 =
  'https://cdn2.schoovr.com/360videos/1619696195988360tms-00199254_Bartolome_7_360.jpg';
var source2 =
  'https://cdn2.schoovr.com/360videos/1670588227228C.-Newgrange.jpg';
// var backgroundImage = source1;
var monorailInfoCard = require('./res/infocard_monorail.png');
var statueWindowCard = require('./res/infocard_statue.png');
var slutWindowCard = require('./res/infocard_slut.png');
var indicator = require('./res/poi_white.png');
var backImage = require('./res/icon_back.png');
var remnum = require('./res/68.png');
var getlesimg = require('./res/360.png');
var num = '';

/**
 * Grab our created custom controls used within this scene.
 */
var LoadingSpinner = require('./custom_controls/LoadingSpinner');
var InfoElement = require('./custom_controls/InfoElement');
var KeyboardPad = require('./KeyboardPad');
var KeyPad = require('./KeyPad');

export default class OfficeTourSplashScene extends Component {
  constructor(props) {
    super(props);
    this.socket = io('https://sockets.schoovr.com');
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
    this.socket.on('teacher_data', data => {
      console.log('teacher_data', data);
      if (data.type === 'select') {
        if (data.data.scene === this.state.currentpano.id) {
          if (!data.data.poi) {
            return;
          } else {
            let selectedid = data.data.poi.id;
            for (
              let index1 = 0;
              index1 < this.state.currentpano.pois.length;
              index1++
            ) {
              const element = this.state.currentpano.pois[index1];
              if (selectedid === element.id) {
                this.state.currentpano.pois[index1].selected = true;
                DeviceEventEmitter.emit('open_poi', {poi: element});
              }
            }
          }
        } else {
          let ind = this.state.experiense.data.panos.findIndex(
            x => x.id === data.data.scene,
          );
          if (ind > -1) {
            this.setState({currentpano: this.state.experiense.data.panos[ind]});
            this._gotoscene();
          }
        }
      } else if (data.type === 'close_poi') {
        for (
          let index1 = 0;
          index1 < this.state.currentpano.pois.length;
          index1++
        ) {
          const element = this.state.currentpano.pois[index1];
          this.state.currentpano.pois[index1].selected = false;
          DeviceEventEmitter.emit('open_poi', {poi: element});
        }
      } else if (data.type === 'lesson_content') {
        console.log('lesson_content', data.data);
        if (typeof data.data === 'string') {
          this.setState({lesson_content_url: data.data});
        } else {
          this.state.current_content = data.data;
          this._getpp();
        }
      } else if (data.type === 'close_lesson') {
        this.setState({lesson_content_url: null});
      }
    });
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
      experiense: null,
      currentpano: null,
      userName: '',
      userCreated: false,
      lesson_content_url: null,
      current_content: null,
      vrmode: true,
    };
    this._clickGet = this._clickGet.bind(this);
    DeviceEventEmitter.addListener('vrmode', (...args) => this._vrmode(args));
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
        {this._getKeypad()}
      </ViroScene>
    );
  }
  _vrmode(s) {
    console.log('vrmode', s);
    this.setState({
      vrmode: !this.state.vrmode,
    });
  }
  /**
   * Displays a set of InfoElement controls representing several POI locations
   * within this scene, and as well as a back button at the bottom of the scene.
   */
  _gotoscene() {
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
  }
  _getKeypad() {
    if (this.state.hiddepinboard && !this.state.userCreated) {
      return (
        <ViroNode opacity={1.0}>
          <ViroText
            text="Enter user name"
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 0])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
          />
          <ViroText
            text={'Name: ' + this.state.userName}
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
    } else if (this.state.hiddepinboard) {
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
            text={'Lesson: ' + this.state.newpin}
            width={6}
            height={1}
            position={polarToCartesian([-2, 0, 10])}
            style={styles.textStyle}
            outerStroke={{type: 'Outline', width: 8, color: '#dd5400'}}
          />
          <KeyPad sendClick={this._clickGet.bind(this)} position={[0, 0, 0]} />
        </ViroNode>
      );
    } else if (this.state.lesson_content_url || this.state.current_content) {
      return (
        <ViroNode opacity={1.0}>
          <ViroFlexView
            width={2}
            height={1}
            opacity={1.0}
            position={[0.8, 0, 0.5]}
            transformBehaviors={['billboard']}
            backgroundColor={'white'}
            animation={{
              name: this.state.contentCardAnimation,
              run: this.state.runInfoCardAnimation,
              loop: false,
              onFinish: this._animateContentCardFinished,
            }}>
            <ViroImage
              transformBehaviors={['billboard']}
              width={2}
              height={1}
              opacity={1.0}
              scale={[0.95, 0.95, 0.95]}
              source={{
                uri: this.state.lesson_content_url,
              }}
              animation={{
                name: this.state.iconCardAnimation,
                run: this.state.runIconCardAnimation,
                loop: false,
                onFinish: this._animateIconCardFinished,
              }}
            />
          </ViroFlexView>
        </ViroNode>
      );
    } else {
      return this._createpois();
    }
  }
  // _getInfoControls() {
  //   if (this.state.currentpano) {
  //     return <ViroNode opacity={1.0}>{this._createpois()}</ViroNode>;
  //   }
  // }
  _clickGet(c) {
    this._onClickNum(c);
  }
  _createpois() {
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
  _onClickNum(n) {
    if (this.state.userCreated) {
      if (n.indexOf('backspace') > -1) {
        num = num.slice(0, -1);
        this.setState({newpin: num});
      } else if (n.indexOf('enter') > -1) {
        this._getLesson(num);
        this._start();
      } else if (n && n.length > 0) {
        num += n;
        this.setState({newpin: num});
      }
    } else {
      if (n.indexOf('backspace') > -1) {
        num = num.slice(0, -1);
        this.setState({userName: num});
      } else if (n.indexOf('enter') > -1) {
        // this._getLesson(num);
        this.setState({userCreated: true});
        num = '';
      } else if (n && n.length > 0) {
        num += n;
        this.setState({userName: num});
      }
    }
  }
  _start() {
    const obj = {
      pin: this.state.newpin,
      name: this.state.userName,
    };
    this.socket.emit('join_as_student', obj);
  }
  /**
   * Callback function for when the user taps on back button located at the
   * bottom of the scene. This pops the current scene to the previous one.
   */
  _onBackClick() {
    this.props.sceneNavigator.pop();
  }
  _getLesson(l) {
    // fetch('https://cdn2.schoovr.com/launchbypin/16662')
    fetch('https://cdn2.schoovr.com/launchbypin/' + l)
      .then(response => response.json())
      .then(json => {
        this.setState({experiense: json.data.experience});
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
  _getpp(l) {
    // fetch('https://cdn2.schoovr.com/getpp/' + l)
    let data = {
      url: this.state.current_content.content.url,
    };
    fetch('https://cdn2.schoovr.com/getpp/', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data, // body data type must match "Content-Type" header
    }).then(response => {
      console.log('response', response);
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
