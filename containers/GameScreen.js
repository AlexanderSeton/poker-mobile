import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView } from "react-native";
import Player from "../components/Player"
import SockJS from "sockjs-client";
import { Stomp } from "stomp-websocket/lib/stomp";

let stompClient;

const GameScreen = (props) => {

    async function connect() {
        let socket = await new SockJS("http://localhost:8080/ws");
        stompClient = await Stomp.over(socket);
        await stompClient.connect({}, function (frame) {
            // setConnected(true);
            console.log("Connected: " + frame);
            stompClient.subscribe("/client/greetings", function(response) {
                console.log("SERVER'S Response: ", response.body);
                // let players = JSON.parse(response.body);
                // setPlayers([players]); // temp for testing
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
        stompClient.send(`/server/create/game/${props.route.params.gameId}`, {}, JSON.stringify(
            {
                "id": props.route.params.userId,
                "bigBlindValue": props.route.params.bigBlind
            }));
        console.log("TEST: user id state at create game function: " + userId);
    }

    function connectToGame(){
        stompClient.connect(`/server/game/${props.route.params.gameId}`,{},JSON.stringify(
            {
                "id": props.route.params.userId
            }
        ))
    }

    function sendName() {
        // connect();
        stompClient.send("/server/hello", {}, JSON.stringify({"name": "Alexander"}));
    }

    function handleFold() {
        // connect();
        stompClient.send("/server/action/game/1", {}, JSON.stringify({
            "action": "fold",
            "betAmount": 0,
            "playerId": userId
        }));
    }

    function handleBet(){
        stompClient.send("/server/action/game/1", {}, JSON.stringify({
            "action": "bet",
            "betAmount": betAmount,
            "playerId": props.route.params.userId
        }));
    }

    function handleCall(){
        stompClient.send("/server/action/game/1", {}, JSON.stringify({
            "action": "call",
            "betAmount": 0,
            "playerId": props.route.params.userId
        }));
    }

    // function showGreeting(message) {
    //     $("#greetings").append("<tr><td>" + message + "</td></tr>");
    // }

    // $(function () {
    //     $("form").on("submit", function (e) {
    //         e.preventDefault();
    //     });
    //     $( "#connect" ).click(function() { connect(); });
    //     $( "#disconnect" ).click(function() { disconnect(); });
    //     $( "#send" ).click(function() { sendName(); });
    // });

    // WEBSOCKET ROUTES:
    // gameData - refreshed after every player"s action/move
    // allPlayers - refreshed after every player"s action/move
    // holCards - refreshed start of every round/game
    // ?winner - refreshed end of every round/game

    // CLIENT-SIDE STATES (individual to each user)
    const [userId, setUserId] = useState();
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
    const [allPlayers, setAllPlayers] = useState([]);
    const [activePlayer, setActivePlayer] = useState(); // calculated from allPlayers
    const [winner, setWinner] = useState(); // standalone route ??
    const [largestContribution, setlargestContribution] = useState();
    const [gameId,setGameId] = useState();

    useEffect(() => {
        connect();
        setUserId(props.route.params.userId);
        setTimeout(() => {
            if (props.route.params.newGame !== undefined) {
                createNewGame();
            } else {
                connectToGame();
            }
        }, 1000)
        // setTimeout(() => {
        //     sendName();
        // }, 1000)
    }, [])
    

        // function handleCall () {
        //     stompClient.send("/server/hello",{}, JSON.stringify({
    
        //     }));
    
        // }
    
        // function handleBet () {
        //     stompClient.send("/server/hello",{}, JSON.stringify());
    
        // }
        
        // function handleFold (element) {
        //     element.$server.fold();
        // }
    
        // function handleCall () {
        //     activePlayer.call();
        // }
    
        // function handleBet () {
        //     activePlayer.bet();
        // }
    

    const playerItems = players.map((player, index) => {
        return <Player player={player} key={index} />
    })

    return(
        <SafeAreaView>
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
        borderWidth: 1,
    },
});

export default GameScreen;
