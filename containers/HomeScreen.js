import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);

    const checkLoggedIn = () => {
        if (loggedIn) {
            return true;
        }
        return false;
    }

    return(
        <View>
            <Button
                title="Log In"
                onPress={() => 
                    setLoggedIn(true)
                }
            />
            <Button
                title="Join Game"
                disabled={!checkLoggedIn()}
                onPress={() =>
                    props.navigation.navigate("JoinGame")
                }
            />
            <Button
                title="Create Game"
                disabled={!checkLoggedIn()}
                onPress={() =>
                    props.navigation.navigate("CreateGame")
                }
            />
            <Button
                title="Friends"
                disabled={!checkLoggedIn()}
                onPress={() =>
                    props.navigation.navigate("Friends")
                }
            />
            <Button
                title="Account"
                disabled={!checkLoggedIn()}
                onPress={() =>
                    props.navigation.navigate("Account")
                }
            />
        </View>
    )
}

export default HomeScreen;
