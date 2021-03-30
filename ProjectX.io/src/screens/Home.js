import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase';
import axiosConfig from '../axiosConfig'

import { useIsFocused } from "@react-navigation/native";

import ProjectItem from '../components/projectItem'
import Hr from '../components/Hr'

import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
} from 'react-native'
import Spacer from '../components/Spacer';

const Home = ({ navigation }) => {

    const isFocused = useIsFocused();

    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([])


    useEffect(() => {
        axiosConfig.get('/projects/' + firebase.auth().currentUser.uid)
            .then(({ data }) => {
                setProjects(data)
                setIsLoading(false)
            })
            .catch(e => console.log(e))
    }, [isFocused])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
                <Text style={styles.title}>ProjectX.io</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                    style={{ marginHorizontal: 20 }}
                >
                    <Feather name="settings" size={40} color="#04476e" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddProject')}
                >
                    <FontAwesome name="plus" size={40} color="#04476e" />
                </TouchableOpacity>
            </View>
            <Hr />

            {isLoading ? (
                <ActivityIndicator style={styles.loading} size='large' />
            ) : (
                <>
                       {projects.length <= 0 ? (
                    <Text style={styles.text}>You Don't have any projects. You can add a new projects by click add butoon up there</Text>
                ) : null}
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={projects}
                    keyExtractor={res => res.id.toString()}
                    style={{ width: '90%' }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Project', { id: item.id.toString() })}
                            >
                                <ProjectItem project={item} />
                            </TouchableOpacity>
                        )
                    }}
                />
                </>
                )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#1e9ce6',
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
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        margin: 2,
        color: '#04476e',
        flex: 1
    },
    loading: {
        margin: 60
    },
    text: {
        color: '#04476e',
        marginVertical: 5,
        fontSize: 22,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
})

export default Home
