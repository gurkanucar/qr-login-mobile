import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const HomeComponent = (props) => {
  const { credientals, onClickButton, onClickScan, result } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <Text style={styles.text}>Username: {credientals.username}</Text>
      <Text style={styles.text}>Id: {credientals.id}</Text>
      <Text style={styles.text}>Token: {credientals.access_token}</Text>
      <Text style={styles.text}>
        Refresh Token: {credientals.refresh_token}
      </Text>
      <TouchableOpacity
        onPress={onClickButton}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Logout</Text>
      </TouchableOpacity>
      {!result && (
        <TouchableOpacity
          onPress={onClickScan}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 32,
  },
  text: { marginLeft: 20, marginRight: 20, marginBottom: 20, fontSize: 18 },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonContainer: {
    marginTop: 20,
    width: 200,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
