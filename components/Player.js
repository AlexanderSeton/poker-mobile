import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import faceDownCard from "../assets/cards/2B.svg";

const Player = function(props) {
    return(
        <View style = {styles.player}>
            <Image
                style ={styles.image}
                source={require("../assets/icon.png")}
            />
            <Text>Name: {props.player.name}</Text>
            <Text>£{props.player.stack}</Text>
            <Image/>
        </View>
    )
}

const styles = StyleSheet.create({
    player: {
    borderWidth: 2,
    backgroundColor: "green",
    width: "30%",
    height: "auto",
    alignItems: "center",
    textAlign: "center",
    },
    image: {
        width: "60%",
        height: "60%",
    },
});

export default Player;
