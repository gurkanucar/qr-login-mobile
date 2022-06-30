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
  const { jwtToken, room, code } = props;

  const [data, setData] = useState();
  const [stompClient, setStompClient] = useState(null);

  const getLoginRequestObject = () => {
    return {
      room: room,
      code: code,
      message: jwtToken,
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
  };

  const onError = (error) => {
    console.log(error);
  };

  const sendMessage = async (msg) => {
    if (stompClient) {
      console.log("message sending.....");
      stompClient.send("/app/login/" + room, {}, JSON.stringify(msg));
    }
    //  }
  };

  return <View></View>;
};
