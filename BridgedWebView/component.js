import React, { PureComponent } from 'react';
import { Alert, Keyboard, StatusBar, View, WebView } from 'react-native';
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
    toggler: 0,
    ready: false,
  };

  keyboardWillHideListener = null;

  componentDidMount() {
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => this.setState({ toggler: this.state.toggler === 0 ? 1 : 0 }),
    );
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardWillHide', this.keyboardWillHideListener);
    this.keyboardWillHideListener = null;
  }

  onLoad = () => this.setState({ ready: true });

  onMessage = async (event) => {
    const { id, payload, type } = decodeMessage(event);
    if (type === '__alert__') {
      Alert.alert(`${JSON.stringify(payload)}`);
    } else if (type === '__exitFullscreen__') {
      StatusBar.setHidden(!this.props.statusbar);
    } else if (type === '__log__') {
      console.log(...payload);
    } else {
      try {
        const result = await this.props.onCall(type, payload);
        this.webview.postMessage(encodeMessage(id, result));
      } catch (error) {
        this.webview.postMessage(encodeMessage(id, null, error));
      }
    }
  };

  onRef = ref => {
    this.webview = ref;
  };

  renderStatusBar() {
    if (!this.props.statusbar) {
      return <StatusBar hidden />;
    }
    const barStyle = (() => {
      if (this.props.statusbar === 'light') {
        return 'light-content';
      }
      if (this.props.statusbar === 'dark') {
        return 'dark-content';
      }
      return 'default';
    })();
    return (
      <StatusBar
        animated
        barStyle={barStyle}
        style={{
          backgroundColor: 'transparent',
        }}
        translucent
      />
    );
  };

  render() {
    // fixes a bug where the view does not reset to the original position
    // when the keyboard is dismissed
    if (this.state.toggler) {
      setTimeout(() => this.setState({ 'toggler' : 0 }), 10);
    }
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
            originWhitelist={['*']}
            ref={this.onRef}
            source={this.props.source}
            style={{
              backgroundColor: 'transparent',
              height: '100%',
              marginTop: this.state.toggler,
              opacity: this.state.ready ? 1 : 0,
              width: '100%',
            }}
            useWebKit={true}
          />
      </View>
    );
  }
}