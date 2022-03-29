import { StyleSheet, SafeAreaView, View } from 'react-native';
import Board from './src/screens/Board';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useLayoutEffect, useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const test = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useLayoutEffect(() => {
    test();
  }, []);


  return (
    <View style={styles.container}>
      {!loading && <Board/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
