import React from "react";
import { View, Text, Button } from "react-native";

const AccountScreen = (props) => {
    return(
        <View>
            <Text>Account Screen</Text>
            {/* <Button
                title="Back to home"
                onPress={() =>
                    props.navigation.navigate('Home')
                }
            /> */}
        </View>
    )
}

export default AccountScreen;
