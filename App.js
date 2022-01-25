import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './containers/HomeScreen';
import FriendsScreen from './components/FriendsScreen';
import AccountScreen from './components/AccountScreen';
import JoinGameScreen from './components/JoinGameScreen';
import CreateGameScreen from './components/CreateGameScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="JoinGame"
          component={JoinGameScreen}
        />
        <Stack.Screen
          name="CreateGame"
          component={CreateGameScreen}
        />
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
