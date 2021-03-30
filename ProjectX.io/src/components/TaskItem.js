import React from 'react'

import axiosConfig from '../axiosConfig'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native'

import { AntDesign } from '@expo/vector-icons';

const TaskItem = ({ task, reRender }) => {

    const numberWithCommas = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    const onDeleteTask = () => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        axiosConfig.delete('/task/delete/' + task.id)
                            .then(() => reRender())
                            .catch(e => console.log(e))
                    }
                }
            ]
        );
    }


    const onDoneTask = () => {
        Alert.alert(
            "Done Task",
            "Are you sure you FINISH this task COMPLETLY?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        axiosConfig.put('/task/done/' + task.id)
                            .then(() => reRender())
                            .catch(e => console.log(e))
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title} >{task.task_name}</Text>
                <TouchableOpacity
                    onPress={onDeleteTask}
                >
                    <AntDesign name="delete" size={24} color="#04476e" />
                </TouchableOpacity>
            </View>
            <Text style={styles.inputLabel}>Cost:</Text>
            <Text style={styles.text}>{numberWithCommas(task.cost)} SR</Text>
            <Text style={styles.inputLabel}>Done:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.text, { color: !task.done ? 'red' : "#04476e" }]}>{task.done ? 'Yes' : 'Not yet'}</Text>
                {!task.done ? (
                    <TouchableOpacity
                        onPress={onDoneTask}
                    >
                        <AntDesign name="check" size={24} color="#04476e" />
                    </TouchableOpacity>
                ) : null}
            </View>
            <Text style={styles.inputLabel}>Description:</Text>
            <Text style={styles.text}>{task.task_description}</Text>
            <Text style={styles.inputLabel}>Created At: {task.created_at.split('T')[0]}</Text>
        </View>
    )
}

export default TaskItem

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        width: '90%',
        backgroundColor: '#91d4fa',
        flex: 1,
        marginVertical: 10,
        borderRadius: 10,
        padding: 30,
        alignSelf: 'flex-start'
    },
    title: {
        fontSize: 40,
        color: "#04476e",
    },
    inputLabel: {
        color: '#04476e',
        marginVertical: 5,
        fontSize: 18
    },
    text: {
        color: '#04476e',
        marginVertical: 5,
        fontSize: 22,
        paddingHorizontal: 20
    },
})
