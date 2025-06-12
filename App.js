import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTimerScreen from './screens/AddTimerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Timers" component={HomeScreen} />
        <Stack.Screen name="Add Timer" component={AddTimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
