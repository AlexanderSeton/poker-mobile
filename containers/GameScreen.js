import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView } from "react-native";

const GameScreen = () => {
    return(
        <SafeAreaView>
            <View style={styles.main}>

                <View style={styles.top}>
                    <Text style={styles.text}>Top</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.userTop}>
                        <View style={styles.userHand}>
                            <Text style={styles.text}>Hole Cards</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={styles.text}>User Data</Text>
                        </View>
                    </View>

                    <View style={styles.userBottom}>
                        <Text style={styles.text}>User Bottom (Buttons)</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingTop: "7.5%",
    },
    top: {
        borderWidth: 1,
        height: "50%",
    },
    bottom: {
        borderWidth: 1,
        height: "50%",
    },
    text: {
        textAlign: "center",
        fontSize: 20,
    },
    smallText: {
        textAlign: "center",
        fontSize: 15,
    },
    userTop: {
        height: "60%",
        flexDirection: "row",
    },
    userBottom: {
        height: "40%",
    },
    userHand: {
        borderWidth: 1,
        // borderColor: "green",
        width: "60%",
    },
    userData: {
        borderWidth: 1,
        // borderColor: "red",
        width: "40%",
    },
});

export default GameScreen;
