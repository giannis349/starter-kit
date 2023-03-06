/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

/**
 * Pull in all imports required for this control.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

import {
  ViroImage,
  ViroNode,
  ViroAnimations,
  ViroFlexView,
  ViroAnimatedComponent,
  ViroText,
} from 'react-viro';

/**
 * Pull in all the images needed for this control.
 */
var infoIconImage = require('../res/poi_white.png');

/**
 * Tags for referencing the animation component views used to execute animations on
 * our Icon Card and our Content Card views.
 */
var CONTENT_CARD_REF = 'contentCard';
var ICON_CARD_REF = 'iconCard';

/**
 * Custom control that toggles between two viro images: an Icon Card and a Content Card.
 * This control can be given a reference to the required('./image') content to be displayed,
 * and as well as the size it should be scaled to. Note that the Icon Card is displayed by default.
 *
 * Accepted propTypes:
 * @content - Reference to the require('./image') content to displayed upon clicking of the Icon Card.
 * @contentCardScale - The size of the Content Card that it should be animated to.
 */

export default class InfoElement extends Component {
  static propTypes = {
    content: PropTypes.object, // Opaque type returned by require('./image.jpg')
    contentCardScale: PropTypes.arrayOf(PropTypes.number),
  };

  constructor() {
    super();

    // set initial state here
    this.state = {
      iconCardAnimation: 'showIconAnim',
      contentCardAnimation: 'hideAnim',
      runInfoCardAnimation: false,
      runIconCardAnimation: false,
    };

    // bind `this` to functions
    this._onCardClick = this._onCardClick.bind(this);
    this._animateIconCard = this._animateIconCard.bind(this);
    this._animateContentCard = this._animateContentCard.bind(this);
    this._animateIconCardFinished = this._animateIconCardFinished.bind(this);
    this._animateContentCardFinished =
      this._animateContentCardFinished.bind(this);
  }

  /**
   * Displays either an Icon Card or a Content Card. The Icon Card is displayed by default
   * until the user does click it (_onCardClick). We then animate the Icon Card out, and the Content
   * Card in, and vice versa if the user clicks on it again.
   */
  render() {
    return (
      <ViroNode onClick={this._onCardClick} {...this.props}>
        {/* Info Card */}
        <ViroImage
          transformBehaviors={['billboard']}
          width={2}
          height={2}
          opacity={1.0}
          scale={[0.4, 0.4, 0.4]}
          source={infoIconImage}
          animation={{
            name: this.state.iconCardAnimation,
            run: this.state.runIconCardAnimation,
            loop: false,
            onFinish: this._animateIconCardFinished,
          }}
        />
        <ViroText
          transformBehaviors={['billboard']}
          text={this.props.content.title}
          width={6}
          height={1}
          opacity={1.0}
          scale={[1, 1, 1]}
          position={[0, 0.7, 0]}
          style={styles.textStyle}
        />

        {/* Content Card*/}
        <ViroNode
          scale={[
            this.props.contentCardScale[0],
            this.props.contentCardScale[1],
            this.props.contentCardScale[2],
          ]}
          transformBehaviors={['billboard']}>
          <ViroImage
            transformBehaviors={['billboard']}
            width={1}
            height={1}
            opacity={0.0}
            scale={[0.4, 0.4, 0.4]}
            position={[-1.3, 0, 0]}
            source={{
              uri:
                'https://cdn2.schoovr.com/userfiles/' +
                this.props.content.image,
            }}
            animation={{
              name: this.state.contentCardAnimation,
              run: this.state.runInfoCardAnimation,
              loop: false,
              onFinish: this._animateContentCardFinished,
            }}
          />
          <ViroFlexView
            width={2}
            height={1}
            opacity={0.0}
            position={[0.8, 0, 0.5]}
            transformBehaviors={['billboard']}
            backgroundColor={'white'}
            animation={{
              name: this.state.contentCardAnimation,
              run: this.state.runInfoCardAnimation,
              loop: false,
              onFinish: this._animateContentCardFinished,
            }}>
            <ViroText
              transformBehaviors={['billboard']}
              text={this.props.content.description}
              width={2}
              height={1}
              opacity={0.0}
              position={[0.8, 0, 0.5]}
              scale={[0.3, 0.3, 0.3]}
              style={styles.textStyleBlack}
              animation={{
                name: this.state.contentCardAnimation,
                run: this.state.runInfoCardAnimation,
                loop: false,
                onFinish: this._animateContentCardFinished,
              }}
            />
          </ViroFlexView>
        </ViroNode>
      </ViroNode>
    );
  }

  /**
   * Attached callback to the onClick event of this control. We then
   * animate in / out either the Icon or Content card correspondingly.
   */
  _onCardClick() {
    var showContentCard = this.state.contentCardAnimation == 'hideAnim';
    if (showContentCard == true) {
      this._animateIconCard(!showContentCard);
    } else {
      this._animateContentCard(showContentCard);
    }
  }

  /**
   * Show and hide animations for both the Icon and Content Card in this control.
   */
  _animateIconCard(isVisible) {
    this.setState({
      iconCardAnimation: isVisible ? 'showIconAnim' : 'hideAnim',
      runIconCardAnimation: true,
    });
  }

  _animateContentCard(isVisible) {
    this.setState({
      contentCardAnimation: isVisible ? 'showContentCardAnim' : 'hideAnim',
      runInfoCardAnimation: true,
    });
  }

  /**
   * Animation callbacks for displaying either the Content
   * card after hiding the Icon card and vice versa.
   */
  _animateIconCardFinished() {
    if (this.state.iconCardAnimation == 'hideAnim') {
      this._animateContentCard(true);
    }
  }

  _animateContentCardFinished() {
    if (this.state.contentCardAnimation == 'hideAnim') {
      this._animateIconCard(true);
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgred: {
    backgroundColor: '#FFFFFF',
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
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyleBlack: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#000000',
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

ViroAnimations.registerAnimations({
  hideAnim: {
    properties: {scaleX: 0.1, scaleY: 0.1, scaleZ: 0.1, opacity: 0.0},
    easing: 'Bounce',
    duration: 100,
  },
  showContentCardAnim: {
    properties: {scaleX: 1, scaleY: 1, scaleZ: 1, opacity: 1.0},
    easing: 'PowerDecel',
    duration: 150,
  },
  showIconAnim: {
    properties: {scaleX: 0.5, scaleY: 0.5, scaleZ: 0.5, opacity: 1.0},
    easing: 'PowerDecel',
    duration: 150,
  },
});

module.exports = InfoElement;
