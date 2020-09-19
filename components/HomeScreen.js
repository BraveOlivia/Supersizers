// Homescreen.js

import React, { Component } from "react";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  createAppContainer,
} from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faDollarSign,
  faCogs,
  faCheckSquare,
  faLightbulb,
  faShoppingBag,
  faUserFriends,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as firebase from "firebase";
import QuestScreen from "./QuestScreen";
import AsyncStorage from "@react-native-community/async-storage";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questCompletion: 0,
      avatarStatus: 80,
      avatarHealth: 0,
    };
    console.log("home");
    this.updateHealth();
  }

  //Occurs when signout is pressed;
  signOutPress = () => {
    firebase.auth().signOut();
  };

  handleAvatarHealthChange = (props) => {
    const avatarHealth = props.health;
    if (avatarHealth > 80) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_1.png")}
        />
      );
    } else if (avatarHealth > 60 && avatarHealth <= 80) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_2.png")}
        />
      );
    } else if (avatarHealth > 40 && avatarHealth <= 60) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_3.png")}
        />
      );
    } else if (avatarHealth > 20 && avatarHealth <= 40) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_4.png")}
        />
      );
    } else {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_5.png")}
        />
      );
    }
  };

  updateHealth = async () => {
    try {
      const health = await AsyncStorage.getItem("avatarHealth");
      if (health !== null) {
        this.setState({
          avatarHealth: this.state.avatarHealth + parseInt(health),
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    var health = this.state.avatarHealth;
    // var intervalID = setInterval(() => {
    //   this.health -= 5;
    // }, 1000);
    console.log(health);

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <FontAwesomeIcon icon={faHome} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faDollarSign} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faCogs} size={30} color={"grey"} />
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size={30}
            color={"grey"}
            onPress={this.signOutPress}
          />
        </View>

        <View style={styles.avatarContainer}>
          <Text style={styles.avatarDialogue}>
            [AvatarName]: G'day[UserName], staying healthy?
          </Text>
          <this.handleAvatarHealthChange health={health} />
          {/* <Image
            style={styles.avatar}
            source={require("../assets/avatar/avatar_2.png")}
          /> */}
          <View style={styles.emotionStatus}>
            <Text>[Happiness Bar]</Text>
          </View>
          <View style={styles.healthStatus}>
            <Text>[Status Bar]</Text>
          </View>
          {/* <Button
          color="fuchsia"
          title="Feed Avatar"
          onPress={() => Alert.alert("Avatar:", "Thank you!")}
        /> */}
        </View>

        <View style={styles.footMenu}>
          <View style={styles.menurow}>
            <FontAwesomeIcon icon={faCheckSquare} size={30} color={"grey"} />
            <FontAwesomeIcon icon={faLightbulb} size={30} color={"grey"} />
            <FontAwesomeIcon icon={faShoppingBag} size={30} color={"grey"} />
            <FontAwesomeIcon icon={faUserFriends} size={30} color={"grey"} />
          </View>

          <View style={styles.menurow}>
            <Button
              title="Quests"
              onPress={() => this.props.navigation.navigate("Quest")}
            />

            <Button
              title="Nutrition"
              onPress={() => this.props.navigation.navigate("Nutritional")}
            />

            <Button
              title="Shop"
              onPress={() => this.props.navigation.navigate("Shop")}
            />

            <Button
              title="Friends"
              onPress={() => console.log("Socialise Button Pressed")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    flex: 1,
    flexDirection: "column",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  avatarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  footMenu: {
    flex: 0.1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
    flexDirection: "column",
    margin: 30,
    padding: 1,
    marginBottom: "10%",
  },

  menurow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  avatar: {
    width: "50%",
    height: "50%",
    margin: 50,
  },

  avatarDialogue: {
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    borderWidth: 0.5,
    borderRadius: 5,
    width: 250,
    padding: 10,
    marginTop: "20%",
    justifyContent: "center",
  },

  emotionStatus: {
    flex: 1.2,
    width: 250,
    backgroundColor: "lightgreen",
    justifyContent: "center",
  },

  healthStatus: {
    margin: 5,
    flex: 1.2,
    width: 250,
    backgroundColor: "orange",
    justifyContent: "center",
  },
});
