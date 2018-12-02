import React, { PureComponent } from 'react';
import { StatusBar, View, WebView } from 'react-native';
import injectors from './injectors';
import { decodeMessage, encodeMessage, getInjectedCode } from './utils';

export default class extends PureComponent {

  static defaultProps = {
    color: '#fff',
    onCall() {},
    source: 0,
    statusbar: false,
  };

  state = {
    ready: false,
  };

  onLoad = () => this.setState({ ready: true });

  onMessage = async (event) => {
    const { id, payload, type } = decodeMessage(event);
    const result = await this.props.onCall(type, payload);
    this.webview.postMessage(encodeMessage(id, result));
  }

  onRef = ref => {
    this.webview = ref;
  };

  renderStatusBar() {
    if (!this.props.statusbar) {
      return <StatusBar hidden />;
    }
    return <StatusBar />;
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.color,
          height: '100%',
          width: '100%',
        }}
      >
        {this.renderStatusBar()}
        <WebView
          allowsInlineMediaPlayback={true}
          bounces={false}
          dataDetectorTypes="none"
          injectedJavaScript={getInjectedCode(injectors)}
          mediaPlaybackRequiresUserAction={false}
          onMessage={this.onMessage}
          onLoad={this.onLoad}
          ref={this.onRef}
          source={this.props.source}
          style={{
            backgroundColor: 'transparent',
            height: '100%',
            opacity: this.state.ready ? 1 : 0,
            width: '100%',
          }}
        />
      </View>
    );
  }
}