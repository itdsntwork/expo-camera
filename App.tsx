import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './src/components/Camera';

export default function App() {
  return (
    <View className='flex items-center justify-center flex-1 bg-red-300'>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />

      <Camera />
    </View>
  );
}
