import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, Text, View } from 'react-native';

import Main from './src/Main'

const Stack = createStackNavigator();

export default function App() {
  return <Main />
}

