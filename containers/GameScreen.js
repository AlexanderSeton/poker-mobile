import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView } from "react-native";
import Player from "../components/Player"

const GameScreen = () => {

    // server states
    const [players, setPlayers] = useState([]);
    const [user, setUser] = useState();
    const [holeCards, setHoleCards] = useState();
    const [communityCards, setCommunityCards] = useState();
    const [smallBlind, setSmallBlind] = useState();
    const [bigBlind, setBigBlind] = useState();
    const [activePlayer, setActivePlayer] = useState();
    const [winner, setWinner] = useState();
    
    const [pot, setPot] = useState();
    const [betAmount, setBetAmount] = useState();

    const playerItems = players.map((player) => {
        return <Player player={player} />
    })

    return(
        <SafeAreaView>
            <View style={styles.main}>

                <View style={styles.top}>

                    <View style={styles.playerView}>
                        <Player/>
                        <Player/>

                    </View>

                    <View style={styles.board}>

                    </View>
                    
                    <View style={styles.playerView}>
                        <Player/>
                        <Player/>
                    </View>

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
                        <View style={styles.buttonView}>
                            <Button
                                title="Fold"
                                onPress={() => 
                                    handleFold()
                                }
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <Button
                                title="Call"
                                onPress={() => 
                                    handleCall()
                                }
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <Button
                                title="Bet"
                                onPress={() => 
                                    handleBet()
                                }
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setBetAmount}
                            value={betAmount}
                            placeholder="Bet Amount..."
                        />
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
    buttonView: {
        height: "60%",
        borderWidth: 1,
        padding: "2%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        borderColor: "blue",
        justifyContent: "center",
    },
    input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    top: {
        borderWidth: 1,
        height: "60%",
        backgroundColor: "green",
    },
    bottom: {
        borderWidth: 1,
        height: "40%",
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
        flexDirection: "row",
        // alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
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
    board: {
        height: "50%",
        flexDirection: "row",
        justifyContent: "flex-start",
        // backgroundColor: "green",
    },
    playerView: {
        height: "25%",
        // backgroundColor: "green",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default GameScreen;
