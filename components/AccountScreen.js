import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AccountScreen = (props) => {

    const [username, setUsername] = useState();
    const [balance, setBalance] = useState();

    return(
        <View style={styles.main}>
            <Text style={styles.text}>Username: {props.userId}</Text>
            <Text style={styles.text}>Balance: £{balance}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingTop: "7.5%",
    },
    text: {
        textAlign: "center",
        fontSize: 25,
        padding: "3%",
        marginBottom: "5%",
    },
    smallText: {
        textAlign: "center",
        fontSize: 15,
    },
});

export default AccountScreen;
