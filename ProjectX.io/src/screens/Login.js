import React, { useState } from 'react'
import * as firebase from 'firebase';
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



const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const onSignin = async () => {
        setIsLoading(true)
        try {
            const res = await firebase.auth()
                .signInWithEmailAndPassword(email.trim(), password)

            setIsLoading(false)
            navigation.navigate('Loading')
        } catch (e) {
            setIsLoading(false)
            setError(e.message)
        }
    }

    forgotPassword = (Email) => {
        setIsLoading(true)
        firebase.auth().sendPasswordResetEmail(Email)
            .then(function (user) {
                setError('Please check your email...')
                setIsLoading(false)
            }).catch(function (e) {
                setError(e.message)
                setIsLoading(false)
            })
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
                    <Text style={styles.title}>Log In</Text>
                </View>
                <View style={styles.viewTwo}>
                    {error ? <Text style={styles.err}>{error}</Text> : null}
                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                        editable={isLoading ? false : true}
                    />
                    <View style={{ width: '100%', alignItems: 'center' }} >
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            editable={isLoading ? false : true}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (!email) {
                                    return setError("Please Enter yor Email..")
                                }
                                forgotPassword(email.trim())
                            }}
                        >
                            <Text style={styles.textForgot}>Forgot your Password..</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={onSignin}
                    >
                        <Text style={styles.btn}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.text}>Create New Account..</Text>
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
        width: 150,
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


export default Login
