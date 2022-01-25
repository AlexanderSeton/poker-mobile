import React from "react";
import { View, Text, Button } from "react-native";

const FriendsScreen = (props) => {
    return(
        <View>
            <Text>Friends Screen</Text>
            {/* <Button
                title="Back to home"
                onPress={() =>
                    props.navigation.navigate('Home')
                }
            /> */}
        </View>
    )
}

export default FriendsScreen;
