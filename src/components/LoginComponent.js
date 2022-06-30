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

export const LoginComponent = (props) => {
  const { values, setValues, onClickButton } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={(e) => setValues({ ...values, username: e })}
        defaultValue={values.username}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="password"
        onChangeText={(e) => setValues({ ...values, password: e })}
        defaultValue={values.password}
      />
      <TouchableOpacity
        onPress={onClickButton}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 50,
    fontSize: 32,
  },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:50,
  },
  input: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    height: 40,
    width: 250,
    margin: 12,
    borderColor: "#5A5A5A",
    borderWidth: 1,
    padding: 10,
  },
  appButtonContainer: {
    marginTop: 20,
    width: 120,
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
