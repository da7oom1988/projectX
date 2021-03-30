import React from 'react'
import * as firebase from 'firebase';

import { FontAwesome5 } from '@expo/vector-icons';

import Spacer from '../components/Spacer'
import Hr from '../components/Hr'

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ActivityIndicator
} from 'react-native'

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <FontAwesome5 name="backspace" size={40} color="#04476e" />
                </TouchableOpacity>
                <Text style={styles.title}>    Settings</Text>
            </View>
            <Hr />
            <Spacer />
            <TouchableOpacity
                onPress={() => {
                    firebase.auth().signOut()
                    navigation.navigate('Loading')
                }}>
                <Text style={styles.btn}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#1e9ce6',
        flex: 1
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#1e9ce6',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        margin: 2,
        color: '#04476e',
        flex: 1
    },
    btn: {
        fontSize: 26,
        backgroundColor: '#D60000',
        padding: 10,
        color: 'white',
        borderRadius: 10,
        width: 300,
        textAlign: 'center',
        marginTop: 10,
        alignSelf: 'center'
    },
    err: {
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center',
    },
    loading: {
        margin: 60
    },
})
