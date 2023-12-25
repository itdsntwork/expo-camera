import { Camera, CameraType } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Viewfinder } from './Viewfinder';
import { CameraContextProvider } from '../contexts/camera/camera.context';
const { useCameraPermissions } = Camera;

export default function App() {
  const [cameraOpen, setCameraOpen] = useState(true);

  const onClose = useCallback(() => {
    setCameraOpen(false);
  }
  , []);

  return cameraOpen ? (
    <CameraContextProvider onClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'center',
        }}
      >
        <Viewfinder />
      </View>
    </CameraContextProvider>
  ) : (
    <View className="items-center justify-center flex-1">
      <Text>Camera Closed</Text>
      <Button title="Open Camera" onPress={() => setCameraOpen(true)} />
    </View>
  );
}

type Props = {
  onClose: () => void;
};
