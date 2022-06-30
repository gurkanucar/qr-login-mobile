import { useEffect, useState } from "react";
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

export const StompExample = (props) => {
  const {jwtToken} = props;

  const [data, setData] = useState();
  const [stompClient, setStompClient] = useState(null);

  const getLoginRequestObject = () => {
    return {
      room: "qwe",
      code: "9ff046019c301ec0efcaa50c",
      message:jwtToken,
      type: "MOBILE",
    };
  };

  useEffect(() => {
    const sock = new SockJS("http://192.168.0.10:8080/loginListener");
    const client = Stomp.over(sock);
    setStompClient(client);
  }, []);

  useEffect(() => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);

  const onConnected = () => {
    if (stompClient !== undefined && stompClient !== null) {
      //sendMessage(username + " connected", "SYSTEM");
      stompClient.subscribe("/topic/loginListener/" + "qwe", onMessageReceived);
      sendMessage(getLoginRequestObject());
    }
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setData(message);
    // setTimeout(() => {
    //
    // }, 500);
  };

  const onError = (error) => {
    console.log(error);
  };

  const sendMessage = async (msg) => {
    // if (msg !== "") {
    //   const data = {
    //     message: "",
    //   };
    if (stompClient) {
      console.log("message sending.....");
      stompClient.send("/app/login/" + "qwe", {}, JSON.stringify(msg));
    }
    //  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stomp Socket</Text>
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
    marginBottom: 50,
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
