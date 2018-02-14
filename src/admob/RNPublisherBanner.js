import PropTypes from 'prop-types';
import React from 'react';
import { requireNativeComponent, View, ViewPropTypes } from 'react-native';

export default class PublisherBanner extends React.Component {
  static propTypes = {
    /**
     * AdMob iOS library banner size constants (https://developers.google.com/admob/ios/banner)
     * banner (320x50, Standard Banner for Phones and Tablets)
     * largeBanner (320x100, Large Banner for Phones and Tablets)
     * mediumRectangle (300x250, IAB Medium Rectangle for Phones and Tablets)
     * fullBanner (468x60, IAB Full-Size Banner for Tablets)
     * leaderboard (728x90, IAB Leaderboard for Tablets)
     * smartBannerPortrait (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
     * smartBannerLandscape (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
     *
     * banner is default
     */
    bannerSize: PropTypes.string,
    /**
     * AdMob ad unit ID
     */
    adUnitID: PropTypes.string,
    /**
     * Test device ID
     */
    testDeviceID: PropTypes.string,
    /**
     * AdMob iOS library events
     */
    adViewDidReceiveAd: PropTypes.func,
    didFailToReceiveAdWithError: PropTypes.func,
    adViewWillPresentScreen: PropTypes.func,
    adViewWillDismissScreen: PropTypes.func,
    adViewDidDismissScreen: PropTypes.func,
    adViewWillLeaveApplication: PropTypes.func,
    admobDispatchAppEvent: PropTypes.func,
    ...ViewPropTypes,
  };

  static defaultProps = {
    bannerSize: 'smartBannerPortrait',
    didFailToReceiveAdWithError: () => {},
    admobDispatchAppEvent: () => {},
  };

  static NativeView = requireNativeComponent('RNAdMobDFP', PublisherBanner);

  state = { style: {} };

  _handleSizeChange = event => {
    const { height, width } = event.nativeEvent;
    this.setState({ style: { width, height } });
  };

  render() {
    const {
      adUnitID,
      testDeviceID,
      bannerSize,
      didFailToReceiveAdWithError,
      admobDispatchAppEvent,
    } = this.props;
    return (
      <View style={this.props.style}>
        <PublisherBanner.NativeView
          style={this.state.style}
          onSizeChange={this._handleSizeChange}
          onAdViewDidReceiveAd={this.props.adViewDidReceiveAd}
          onDidFailToReceiveAdWithError={event =>
            didFailToReceiveAdWithError(event.nativeEvent.error)
          }
          onAdViewWillPresentScreen={this.props.adViewWillPresentScreen}
          onAdViewWillDismissScreen={this.props.adViewWillDismissScreen}
          onAdViewDidDismissScreen={this.props.adViewDidDismissScreen}
          onAdViewWillLeaveApplication={this.props.adViewWillLeaveApplication}
          onAdmobDispatchAppEvent={event => admobDispatchAppEvent(event)}
          testDeviceID={testDeviceID}
          adUnitID={adUnitID}
          bannerSize={bannerSize}
        />
      </View>
    );
  }
}
