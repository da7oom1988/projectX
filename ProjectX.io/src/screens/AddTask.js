import React, { useState, useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

import * as firebase from 'firebase';
import axiosConfig from '../axiosConfig'

import Spacer from '../components/Spacer'
import Hr from '../components/Hr'

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView
} from 'react-native'

const AddTask = ({ navigation, route }) => {

    const { id } = route.params

    const [err, setErr] = useState('')

    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [cost, setCost] = useState('')

    const submitData = () => {
        if (!taskName || !taskDescription || !cost) {
            setErr('Please complate all fields')
            return
        }

        axiosConfig.post('/task/add', {
            projectId: id,
            taskName,
            taskDescription,
            cost,
        }).then(() => {
            navigation.pop()
        }).catch(e => setErr(e.message))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <FontAwesome5 name="backspace" size={40} color="#04476e" />
                </TouchableOpacity>
                <Text style={styles.title}>    Add Task</Text>
            </View>
            <Hr />
            <Spacer />
            <ScrollView style={{ width: '90%' }}>
                {err ? <Text style={styles.err}>{err}</Text> : null}
                <Text style={styles.inputLabel}>Task Name:</Text>
                <TextInput
                    placeholder='Enter Task Name'
                    style={styles.input}
                    value={taskName}
                    onChangeText={setTaskName}
                />
                <Text style={styles.inputLabel}>Task Description:</Text>
                <TextInput
                    placeholder='Description'
                    style={[styles.input, { textAlignVertical: 'top', height: '25%' }]}
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                    numberOfLines={4}
                    multiline={true}
                />
                <Text style={styles.inputLabel}>Task Cost</Text>
                <TextInput
                    placeholder='Enter Task Cost'
                    style={styles.input}
                    value={cost}
                    onChangeText={setCost}
                    keyboardType='numeric'
                />
                <TouchableOpacity
                    onPress={submitData}
                >
                    <Text style={styles.btn}>Create Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddTask

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
    input: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#c7ebff',
        margin: 10,
        fontSize: 20,
        padding: 10,
        alignSelf: 'center',
    },
    inputLabel: {
        color: '#04476e',
        marginVertical: 5,
        fontSize: 18
    },
    btn: {
        fontSize: 26,
        backgroundColor: '#1e9ce6',
        padding: 10,
        color: '#04476e',
        borderRadius: 10,
        width: 250,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    err: {
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center',
    },
})
