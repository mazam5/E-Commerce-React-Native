import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet, Text} from 'react-native';
import HomePage from './screens/HomePage';
import {store} from './redux/store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.home}>
        <View style={[styles.container]}>
          <Text style={styles.title}>Shopping</Text>
          <HomePage />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: 'black',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
    backgroundColor: 'lightblue',
  },
});
export default App;
