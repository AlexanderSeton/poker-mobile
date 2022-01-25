import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = (props) => {

    console.log(props);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log("re-render")
        if (props.route.params !== undefined) {
            loggedInStatus = props.route.params.loggedIn;
            setLoggedIn(loggedInStatus);
        }
    })

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
                    props.navigation.navigate("Login", {
                        loggedIn: loggedIn
                    })
                }
            />
            <Button
                title="Join Game"
                disabled={!loggedIn}
                onPress={() =>
                    props.navigation.navigate("JoinGame")
                }
            />
            <Button
                title="Create Game"
                disabled={!loggedIn}
                onPress={() =>
                    props.navigation.navigate("CreateGame")
                }
            />
            <Button
                title="Friends"
                disabled={!loggedIn}
                onPress={() =>
                    props.navigation.navigate("Friends")
                }
            />
            <Button
                title="Account"
                disabled={!loggedIn}
                onPress={() =>
                    props.navigation.navigate("Account")
                }
            />
        </View>
    )
}

export default HomeScreen;
