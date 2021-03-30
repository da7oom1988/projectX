import React, { useState, useEffect } from 'react'
import axiosConfig from '../axiosConfig'
import * as Progress from 'react-native-progress';
import { useIsFocused } from "@react-navigation/native";

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import TaskItem from '../components/TaskItem'
import Hr from '../components/Hr'

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
    Alert
} from 'react-native'

const Project = ({ navigation, route }) => {

    const isFocused = useIsFocused();

    const { id } = route.params
    const [err, setErr] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState({})
    const [progress, setProgress] = useState(0.0)

    useEffect(() => {

        axiosConfig.get('/project/' + id)
            .then(({ data }) => {
                setProject(data)
                setProgress(data.progress)
                setIsLoading(false)
            })
            .catch(e => console.log(e))
    }, [isFocused])

    const onDeleteTask = () => {
        setIsLoading(true)
        axiosConfig.get('/project/' + id)
            .then(({ data }) => {
                setProject(data)
                setProgress(data.progress)
                setIsLoading(false)
            })
            .catch(e => console.log(e))
    }

    const onDeleteProject = () => {
        Alert.alert(
            "Delete Project",
            "Are you sure you want to delete this PROJECT?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        axiosConfig.delete('/project/delete/' + id)
                            .then(() => navigation.pop())
                            .catch(e => console.log(e))
                    }
                }
            ]
        );
    }

    const numberWithCommas = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={styles.loading} size='large' />
            ) : (
                <>
                    <View style={styles.topView}>
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                        >
                            <FontAwesome5 name="backspace" size={40} color="#04476e" />
                        </TouchableOpacity>
                        <Text style={styles.title}>    {project.project_name}</Text>
                        <TouchableOpacity

                            onPress={onDeleteProject}
                        >
                            <AntDesign name="delete" size={24} color="#04476e" />
                        </TouchableOpacity>
                    </View>
                    <Hr />
                    <ScrollView style={{ width: '90%' }}>
                    <View style={[styles.topView, { justifyContent: 'space-evenly' }]}>
                        <Text style={[styles.text, { fontSize: 30, textAlign: 'center' }]}>Basic Info</Text>
                        <TouchableOpacity
                                onPress={() => navigation.navigate('EditProject', { id })}
                            >
                        <FontAwesome name="pencil" size={24} color="#04476e" />
                        </TouchableOpacity>
                        </View>
                        <Hr />
                        {err ? <Text style={styles.err}>{err}</Text> : null}
                        <Text style={styles.inputLabel}>Project Description:</Text>
                        <Text style={styles.text}>{project.project_description}</Text>

                        <Text style={styles.inputLabel}>Due Date:</Text>
                        <Text style={styles.text}>{project.due_date}</Text>

                        <Text style={styles.inputLabel}>Est. Cost:</Text>
                        <Text style={styles.text}>{numberWithCommas(project.est_cost)} SR</Text>

                        <Text style={styles.inputLabel}>Real Cost:</Text>
                        <Text style={styles.text}>{numberWithCommas(project.realCost)} SR</Text>

                        <Text style={styles.inputLabel}>Progress:</Text>
                        <View style={styles.topView}>
                            <Progress.Bar progress={progress} width={250} color='#04476e' />
                            <Text style={styles.text}>{Math.round(progress * 100)} %</Text>
                        </View>
                        <Hr />
                        <View style={[styles.topView, { justifyContent: 'space-evenly' }]}>
                            <Text style={[styles.text, { fontSize: 30, textAlign: 'center' }]}>Tasks</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddTask', { id })}
                            >
                                <FontAwesome name="plus" size={30} color="#04476e" />

                            </TouchableOpacity>

                        </View>
                        <Hr />
                        {project.tasks.length <= 0 ? (
                    <Text style={[styles.text, {textAlign: 'center'}]}>You Don't have any tasks. You can add a new task by click add butoon up there</Text>
                ) : null}
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={project.tasks}
                            keyExtractor={res => res.id.toString()}
                            renderItem={({ item }) => {
                                return <TaskItem task={item} reRender={onDeleteTask} />
                            }}
                        />
                    </ScrollView>
                </>)}
        </SafeAreaView>
    )
}

export default Project

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
    text: {
        color: '#04476e',
        marginVertical: 5,
        fontSize: 22,
        paddingHorizontal: 20
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
    loading: {
        margin: 60
    },
})
