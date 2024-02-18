import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  CaptureType,
  useCameraContext,
} from '../contexts/camera/camera.context';

export default function ShutterButton() {
  const { camera, cameraPictureOptions, onCapture } = useCameraContext();

  const onPress = async () => {
    const data = await camera?.takePictureAsync(cameraPictureOptions);

    if (data) {
      onCapture({ ...data, type: CaptureType.PHOTO });
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="radio-button-off" size={100} color="white" />
    </TouchableOpacity>
  );
}
