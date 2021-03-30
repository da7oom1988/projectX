import React, { useState } from 'react'
import * as firebase from 'firebase';
import axiosConfig from '../axiosConfig'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native'

const Signup = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const onSignup = async () => {

        if (!name) {
            setError('Please enter your Full name')
            return
        }

        if (rePassword !== password) {
            setError('Passwords don\'t match. Please make reEnter your Password')
            return
        }

        setIsLoading(true)

        try {
            const res = await firebase.auth()
                .createUserWithEmailAndPassword(email.trim(), password)

            // const dbRes = await firebase.database().ref('users/' + res.user.uid).set({
            //     name: name.trim(),
            //     email: email.trim(),
            //     createdAt: new Date().toJSON().slice(0, 10),
            //     isActive: true,
            //     isBannd: false
            // });

            await axiosConfig.post('/user/signup', {
                uid: res.user.uid,
                name: name.trim(),
                email: email.trim(),
            }).catch(e => setError(e.message))

            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setError(e.message)
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior='padding'
                enabled
            >

                <View style={styles.viewOne} >
                    <Text style={[styles.title, { fontSize: 55 }]}>ProjectX.io</Text>
                    {isLoading ? <ActivityIndicator size='large' /> : null}
                    <Text style={styles.title}>Signup</Text>
                </View>
                <View style={styles.viewTwo}>
                    {error ? <Text style={styles.err}>{error}</Text> : null}
                    <TextInput
                        editable={isLoading ? false : true}
                        placeholder='Email'
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        editable={isLoading ? false : true}
                        placeholder='Full Name'
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        editable={isLoading ? false : true}
                        placeholder='Password'
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        editable={isLoading ? false : true}
                        placeholder='Re-Password'
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={rePassword}
                        onChangeText={setRePassword}
                    />
                    <TouchableOpacity
                        onPress={onSignup}
                    >
                        <Text style={styles.btn}>Create an Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.text}>Already have an Account..</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        alignContent: 'center',
        backgroundColor: '#1e9ce6',
        flex: 1
    },
    viewTwo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#1e9ce6',
        padding: 10
    },
    viewOne: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#04476e',
        marginBottom: 10
    },
    input: {
        width: '80%',
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        fontSize: 20,
        padding: 10
    },
    btn: {
        fontSize: 26,
        backgroundColor: '#04476e',
        padding: 10,
        color: 'white',
        borderRadius: 10,
        width: 250,
        textAlign: 'center',
        marginTop: 20
    },
    text: {
        fontWeight: 'bold',
        color: '#04476e'
    },
    err: {
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center',
    },
    textForgot: {
        fontSize: 12,
        color: '#04476e'
    }
})

export default Signup
