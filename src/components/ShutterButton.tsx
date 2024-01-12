import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCameraContext } from '../contexts/camera/camera.context';

export default function ShutterButton() {
  const { camera, setPreviewCapture } = useCameraContext();

  const onPress = async () => {
    const options = { quality: 0.5, base64: true };
    const data = await camera?.takePictureAsync(options);
    console.log(data);
    setPreviewCapture(data);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="radio-button-off" size={100} color="white" />
    </TouchableOpacity>
  );
}
