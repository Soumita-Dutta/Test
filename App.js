/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import screen1 from './src/screen1';
import screen2 from './src/screen2';

const root = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <root.Navigator>
        <root.Screen
          name="screen1"
          component={screen1}
        />
        <root.Screen
          name="screen2"
          component={screen2}
        />
      </root.Navigator>
    </NavigationContainer>
  );
}