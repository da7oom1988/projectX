import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from 'firebase';

import firebaseKey from './config'

import Loading from './screens/Loading'
import AuthNavigator from './navigation/AuthNavigator'
import HomeNavigator from './navigation/HomeNavigator'

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseKey)
}

const Stack = createStackNavigator();

const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Loading"
                    component={Loading}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="HomeNavigator"
                    component={HomeNavigator}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="AuthNavigator"
                    component={AuthNavigator}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });


export default Main
