import React, { useState } from 'react'
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

const AddProject = ({ navigation }) => {

    const [err, setErr] = useState('')
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [estCost, setEstCost] = useState('')



    const submitData = () => {
        if (!projectName || !projectDescription || !dueDate || !estCost) {
            setErr('Please complate all fields')
            return
        }

        axiosConfig.post('/project/add', {
            projectName,
            projectDescription,
            dueDate,
            estCost,
            uid: firebase.auth().currentUser.uid
        }).then(() => {
            navigation.pop()
        }).catch(e => setError(e.message))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <FontAwesome5 name="backspace" size={40} color="#04476e" />
                </TouchableOpacity>
                <Text style={styles.title}>    Add Project</Text>
            </View>
            <Hr />
            <Spacer />
            <ScrollView style={{ width: '90%' }}>
                {err ? <Text style={styles.err}>{err}</Text> : null}
                <Text style={styles.inputLabel}>Project Name:</Text>
                <TextInput
                    placeholder='Enter Project Name'
                    style={styles.input}
                    value={projectName}
                    onChangeText={setProjectName}
                />
                <Text style={styles.inputLabel}>Project Description:</Text>
                <TextInput
                    placeholder='Description'
                    style={[styles.input, { textAlignVertical: 'top', height: '25%' }]}
                    value={projectDescription}
                    onChangeText={setProjectDescription}
                    numberOfLines={4}
                    multiline={true}
                />
                <Text style={styles.inputLabel}>Due Date</Text>
                <TextInput
                    placeholder='Enter Due Date'
                    style={styles.input}
                    value={dueDate}
                    onChangeText={setDueDate}
                />
                <Text style={styles.inputLabel}>Est. Cost</Text>
                <TextInput
                    placeholder='Enter Est. Cost'
                    style={styles.input}
                    value={estCost}
                    onChangeText={setEstCost}
                    keyboardType='numeric'
                />
                <TouchableOpacity
                    onPress={submitData}
                >
                    <Text style={styles.btn}>Create Project</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddProject

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
