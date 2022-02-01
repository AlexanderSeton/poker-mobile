import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView } from "react-native";
import Player from "../components/Player"
import SockJS from "sockjs-client";
import { Stomp } from "stomp-websocket/lib/stomp";

let stompClient;

const GameScreen = (props) => {

    // WEBSOCKET ROUTES:
    // gameData - refreshed after every player"s action/move
    // allPlayers - refreshed after every player"s action/move
    // holCards - refreshed start of every round/game
    // ?winner - refreshed end of every round/game

    // CLIENT-SIDE STATES (individual to each user)
    const [userId, setUserId] = useState(props.route.params.userId);
    const [betAmount, setBetAmount] = useState();

    // SERVER-SIDE STATES
    // individual user states
    const [holeCards, setHoleCards] = useState(); // needs own route (just get user"s cards by id)
    const [user, setUser] = useState(); // calculated from allPlayers
    const [players, setPlayers] = useState([]); // calculated from allPlayers

    // constant states (same for every player)
    const [communityCards, setCommunityCards] = useState(); // gameDataRoute (send after every player"s action)
    const [pot, setPot] = useState(); // gameDataRoute
    const [smallBlind, setSmallBlind] = useState(); // gameDataRoute
    const [bigBlind, setBigBlind] = useState(); // gameDataRoute
    const [activePlayer, setActivePlayer] = useState(); // calculated from allPlayers
    const [winner, setWinner] = useState(); // standalone route ??
    const [largestContribution, setlargestContribution] = useState();
    const [gameKey, setgameKey] = useState();

    useEffect(async() => {
        await connect();
        setTimeout(() => {
            if (props.route.params.newGame !== undefined) {
                console.log("creating new game");
                createNewGame();
            } else {
                connectToGame();
                console.log("connecting to game");
            }
        }, 1000)
    }, [])

    // WEBSOCKET FUNCTIONS
    async function connect() {
        let socket = new SockJS("http://localhost:8080/ws");
        stompClient = await Stomp.over(socket);
        await stompClient.connect({}, function (frame) {
            // setConnected(true);
            console.log("Connected: " + frame);
            stompClient.subscribe("/client/greetings", async function(response) {
                console.log("!!!SERVER'S Response (client/greetings):\n");
                console.log(response["body"]);
                let data = await JSON.parse(response["body"]);
                let players = await data["players"];
                setPlayers(players);
                let board = await data["board"];
                setCommunityCards(board);
                for (let i=0; i<players; i++) {
                    if (players[i]["id"] == props.route.params.userId) {
                        let user = await players[i];
                        setUser(user);
                    }
                }
                let pot = await data["pot"];
                setPot(pot);
            });
            stompClient.subscribe("/client/join", async function(response) {
                console.log("!!!SERVER'S Response (client/join):\n");
                if (response == null) {
                    console.log("NULL RESPONSE");
                }
                console.log(response["body"]);
                let data = await JSON.parse(response["body"]);
                let players = data["players"];
                setPlayers(players);
                let board = data["board"];
                setCommunityCards(board);
            });
        });
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        // setConnected(false);
        console.log("Disconnected");
    }

    function createNewGame() {
        stompClient.send(`/server/create/game/${props.route.params.gameKey}`, {}, JSON.stringify(
            {
                "id": props.route.params.userId,
                "bigBlindValue": props.route.params.bigBlind
            }));
    }

    function connectToGame(){
        console.log(`Game Key: ${props.route.params.gameKey}. User ID: ${props.route.params.userId}`)
        stompClient.send(`/server/join/game/${props.route.params.gameKey}`, {}, JSON.stringify(
            {
                "id": props.route.params.userId
            }
        ))
    }

    function handleFold() {
        // connect();
        stompClient.send(`/server/action/game/${props.route.params.gameKey}`, {}, JSON.stringify({
            "action": "fold",
            "betAmount": 0,
            "playerId": userId
        }));
    }

    function handleBet(){
        stompClient.send(`/server/action/game/${props.route.params.gameKey}`, {}, JSON.stringify({
            "action": "bet",
            "betAmount": betAmount,
            "playerId": props.route.params.userId
        }));
    }

    function handleCall(){
        stompClient.send(`/server/action/game/${props.route.params.gameKey}`, {}, JSON.stringify({
            "action": "call",
            "betAmount": 0,
            "playerId": props.route.params.userId
        }));
    }    

    const playerItems = players.map((player, index) => {
        return <Player player={player} userId={props.route.params.userId} key={index} />
    })

    return(
        <SafeAreaView>

            <Text style={styles.gameKey}>Game Key: {props.route.params.gameKey}</Text>

            <View style={styles.main}>

                <View style={styles.top}>

                    <View style={styles.playerView}>
                        {/* <Text>{players[0]}</Text> */}
                        {playerItems}
                    </View>

                    <View style={styles.board}>
                        
                    </View>
                    
                    <View style={styles.playerView}>

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
                                title="Call/Check"
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
        paddingTop: "3%",
    },
    gameKey: {
        paddingTop: "3%",
        textAlign: "center",
        alignContent: "center",
        fontSize: 20,
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
        height: "50%",
        backgroundColor: "green",
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
        height: "55%",
        flexDirection: "row",
    },
    userBottom: {
        height: "45%",
        flexDirection: "row",
        // alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "10%",
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
        height: "40%",
        flexDirection: "row",
        justifyContent: "flex-start",
        // backgroundColor: "green",
    },
    playerView: {
        height: "30%",
        // backgroundColor: "green",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
    },
});

export default GameScreen;
