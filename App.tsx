/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import Home from './src/screens/Home';

function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.main}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex:1,
    height:'100%'
  }
});

export default App;
