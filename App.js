import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import { HomeComponent } from "./src/components/HomeComponent";
import { LoginComponent } from "./src/components/LoginComponent";
import { QRCodeScanner } from "./src/components/QRCodeScanner";
import { StompExample } from "./src/components/StompExample";
import { BASE_URL } from "./src/constants";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [credientals, setCredientals] = useState();
  const [values, setValues] = useState({ username: "", password: "" });
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    if (result != undefined) {
      setScan(false);
      Alert.alert("readed!");
    }
  }, [result]);

  const getRemoteData = () => {
    fetch(BASE_URLE_URL+"/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("wrong credientals!");
      })
      .then((responseData) => {
        setCredientals(responseData);
      })
      .catch((error) => {
        Alert.alert(error.toString());
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {scan == true && (
        <QRCodeScanner setScan={setScan} setResult={setResult} />
      )}

      {credientals && scan == false && result != undefined && (
        <StompExample
          jwtToken={credientals.access_token}
          room={result.room}
          code={result.code}
        />
      )}
      {credientals && scan == false && (
        <HomeComponent
          result={result}
          credientals={credientals}
          onClickButton={() => {
            setCredientals();
            setResult();
          }}
          onClickScan={() => setScan(true)}
        />
      )}
      {scan == false && credientals == undefined && (
        <LoginComponent
          values={values}
          setValues={setValues}
          onClickButton={getRemoteData}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
