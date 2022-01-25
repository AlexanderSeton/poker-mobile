import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = (props) => {
    return(
        <View>
            <Button
                title="Friends"
                onPress={() =>
                    props.navigation.navigate("Friends")
                }
            />
            <Button
                title="Account"
                onPress={() =>
                    props.navigation.navigate("Account")
                }
            />
        </View>
    )
}

export default HomeScreen;
