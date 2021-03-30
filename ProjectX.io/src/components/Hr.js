import React from 'react'
import { StyleSheet, View } from 'react-native'

const Hr = () => {
    return (
        <View
            style={styles.style}
        />
    )
}

const styles = StyleSheet.create({
    style: {
        borderBottomColor: '#c7ebff',
        width: '100%',
        borderBottomWidth: 2,
        marginBottom: 5,
        marginTop: 5
    }
})


export default Hr

