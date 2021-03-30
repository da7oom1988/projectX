import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase'
import { useIsFocused } from "@react-navigation/native";
import axiosConfig from '../axiosConfig'

import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native'

const Loading = ({ navigation }) => {

    const isFocused = useIsFocused();

    const [err, setErr] = useState('')

    useEffect(() => {
        axiosConfig.get('/test')
            .then(() => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        navigation.navigate('HomeNavigator');
                    } else {
                        navigation.navigate('AuthNavigator');
                    }
                })
            }).catch(() => setErr('check internet connection'))
    }, [navigation, isFocused])

    return (
        <View style={styles.container} >
            <ActivityIndicator
                size='large'
                style={styles.spin}
            />
            <Text style={styles.title}>WELCOME</Text>
            <Text style={[styles.title, { color: 'red', fontWeight: 'normal' }]}>{err}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e9ce6',
        flex: 1
    },
    spin: {
        flex: 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        margin: 30,
        flex: 1,
        color: '#04476e',
        textAlign: 'center'
    },
})

export default Loading
