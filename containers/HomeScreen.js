import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = (props) => {
    return(
        <View>
            <Button
                title="Join Game"
                onPress={() =>
                    props.navigation.navigate("JoinGame")
                }
            />
            <Button
                title="Create Game"
                onPress={() =>
                    props.navigation.navigate("CreateGame")
                }
            />
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
