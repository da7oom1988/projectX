import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home'
import Settings from '../screens/Settings'
import AddProject from '../screens/AddProject'
import EditProject from '../screens/EditProject'
import AddTask from '../screens/AddTask'
import Project from '../screens/Project'


const Stack = createStackNavigator();


const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddProject"
                component={AddProject}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="EditProject"
                component={EditProject}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Project"
                component={Project}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddTask"
                component={AddTask}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}


export default HomeNavigator