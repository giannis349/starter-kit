/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, {Component} from 'react';

// import {ViroVRSceneNavigator} from 'react-viro';
import {ViroVRSceneNavigator} from '@viro-community/react-viro';
import {DeviceEventEmitter} from 'react-native';
var createReactClass = require('create-react-class');

/*
 * TODO: Add your API key below!!
 */
import MainTour from './MainScene';
var apiKey = 'YOUR_API_KEY_HERE';
var vrScenes = {
  MainTour: require('./MainScene'),
  LessonTour: require('./LessonScene'),
};

export default class ViroCodeSamplesSceneNavigator extends Component {
  constructor() {
    super();

    this.state = {
      vrmode: false,
    };
    DeviceEventEmitter.addListener('vrmode', (...args) => this._vrmode(args));
  }
  render() {
    return (
      <ViroVRSceneNavigator
        initialScene={{
          scene: MainTour,
        }}
        apiKey={apiKey}
      />
    );
  }
  _vrmode(s) {
    console.log('vrmode', s);
    this.setState({
      vrmode: !this.state.vrmode,
    });
  }
}
// var ViroCodeSamplesSceneNavigator = createReactClass({
//   render: function () {
//     return (
//       <ViroVRSceneNavigator
//         initialScene={{
//           scene: vrScenes['360PhotoTour'],
//         }}
//         apiKey={apiKey}
//         vrModeEnabled={vrmode}
//       />
//     );
//   },
// });

// Uncomment the below line to use the ARDrivingCar Demo. Don't forget to set the apiKey variable in ARDrivingCar.js
// ViroCodeSamplesSceneNavigator = require('./js/ARDrivingCarDemo/ARDrivingCar');

module.exports = ViroCodeSamplesSceneNavigator;
