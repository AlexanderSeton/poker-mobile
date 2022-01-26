import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, TextInput } from "react-native";

const CreateGameScreen = () => {

    const [gameId, setGameId] = useState();
    const [maxPlayers, setMaxPlayers] = useState();

    const handleSubmit = () => {
        console.log("handleSubmit treggiered", gameId, maxPlayers);
    }

    return(
        <View style={styles.main}>
            <Text style={styles.text}>Game Id:</Text>
            <Text style={styles.smallText}>This will be what people use to join your game</Text>
            <TextInput
                style={styles.input}
                onChangeText={setGameId}
                value={gameId}
                placeholder="Game ID..."
            />
            <Text style={styles.text}>Max Number Players:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={setMaxPlayers}
                value={maxPlayers}
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
    smallText: {
        textAlign: "center",
        fontSize: 15,
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

export default CreateGameScreen;
