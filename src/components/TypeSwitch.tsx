import React, { useCallback, useEffect } from 'react';
import { useCameraContext } from '../contexts/camera/camera.context';
import { TouchableOpacity } from 'react-native';
import { CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const size = 36;
const color = 'white';

export default function TypeSwitch() {
  const { type, setType } = useCameraContext();

  const setTypeHandler = useCallback(() => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  }, [type, setType]);

  const icon = type === CameraType.back ? 'camera-front' : 'camera-rear';

  return (
    <TouchableOpacity onPress={setTypeHandler}>
      <MaterialIcons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}
