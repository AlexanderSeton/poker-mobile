import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";

const LoginScreen = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        if (username == null || password == null || username == "" || password == "") {
            Alert.alert(
                "Missing Fields",
                "Enter username and password, then press submit again",
                [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { 
                        text: "OK", 
                    }
                  ]
            );
        }
        else {
            // check server to validate user
            props.route.params.loggedIn = true;
            props.navigation.navigate("Home", {
                loggedIn: props.route.params.loggedIn
            })
        }
    }

    return(
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username..."
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password..."
            />
            <Button
                title="Submit"
                onPress={() => 
                    handleSubmit()
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default LoginScreen;
