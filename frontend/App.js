import * as React from 'react';
import { AppRegistry,StyleSheet } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import { name as appName } from './app.json';
import Home from './components/Home';



export default function Main() {
  return (
    <NativeBaseProvider>
      <Home/>
    </NativeBaseProvider>
  );
}


AppRegistry.registerComponent(appName, () => Main);