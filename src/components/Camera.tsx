import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
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
const { useCameraPermissions } = Camera;

export default function App() {
  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
      }}
    >
      <Viewfinder/>
    </View>
  );
}

