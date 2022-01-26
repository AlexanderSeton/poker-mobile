import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const JoinGameScreen = () => {

    const [gameId, setGameId] = useState("");

    const handleSubmit = () => {
        console.log("join game handle submit executed");
    }

    return(
        <View style={styles.main}>
            <Text style={styles.text}>Game Id:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setGameId}
                value={gameId}
                placeholder="Game ID..."
            />
            <View style={styles.buttonView}>
                <Button
                    title="Submit"
                    onPress={() => 
                        handleSubmit()
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingTop: "7.5%",
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    text: {
        textAlign: "center",
        fontSize: 20,
    },
    buttonView: {
        borderWidth: 0.5,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5%",
        padding: "1%",
        borderRadius: 10,
        borderColor: "blue",
    },
});

export default JoinGameScreen;
