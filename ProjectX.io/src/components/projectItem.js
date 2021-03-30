import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const projectItem = ({ project }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title} >{project.project_name}</Text>
            <Text >Created At: {project.created_at.split('T')[0]}</Text>
        </View>
    )
}

export default projectItem

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        width: '90%',
        backgroundColor: '#91d4fa',
        flex: 1,
        marginVertical: 10,
        borderRadius: 10,
        padding: 30
    },
    title: {
        fontSize: 40,
        color: "#04476e",
    }
})
