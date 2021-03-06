import React, { Component } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Ionics } from "@expo/vector-icons";
import { StyleSheet, View, Platform } from "react-native";
import RootNavigation from "./navigation/RootNavigation";
import MainNavigator from "./navigation/MainNavigation";
import { createStackNavigator } from "@react-navigation/stack";

import { fb } from "./src/firebase/APIKeys";
import * as firebase from "firebase";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(fb.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  };

  render() {
    if (
      (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) &&
      !this.props.skipLoadingScreen
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          {Platform.OS === "android" && (
            <View style={styles.statusBarUnderlay} />
          )}
          {this.state.isAuthenticated ? <MainNavigator /> : <RootNavigation />}
        </View>
      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/home.png"),
        // require("./assets/images/robot-prod.png"),
      ]),
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Ionics.Font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
      // }),
    ]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
// export default App;
