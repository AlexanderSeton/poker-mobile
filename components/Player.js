import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import faceDownCard from "../assets/cards/2B.svg";

const Player = function(props) {
    return(
        <View style = {styles.player}>
            <Image
                style ={styles.image}
                source={require("../assets/card_icon.png")}
            />
            <Text>{props.player.username}</Text>
            <Text>£{props.player.stack}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    player: {
    borderWidth: 2,
    backgroundColor: "green",
    width: "30%",
    height: "100%",
    alignItems: "center",
    textAlign: "center",
    },
    image: {
        width: "50%",
        height: "50%",
        marginBottom: "5%",
        marginTop: "5%",
    },
});

export default Player;
