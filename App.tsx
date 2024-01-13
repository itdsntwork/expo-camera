import { useState } from 'react';
import Camera from './src/components/Camera';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [cameraOpen, setCameraOpen] = useState(true);

  return cameraOpen ? (
    <Camera onClose={() => setCameraOpen(false)} />
  ) : (
    <View className="items-center justify-center flex-1">
      <Text>Camera Closed</Text>
      <Button title="Open Camera" onPress={() => setCameraOpen(true)} />
    </View>
  );
}
