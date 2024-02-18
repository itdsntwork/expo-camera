import React, { useCallback, useMemo } from 'react';
import { useCameraContext } from '../contexts/camera/camera.context';
import { FlashMode } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const size = 36;
const color = 'white';
const modes = Object.values(FlashMode);

export default function FlashSelector() {
  const { flashMode, setFlashMode } = useCameraContext();

  const onToggleFlashHandler = useCallback(() => {
    const currentIndex = modes.indexOf(flashMode);
    const newIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[newIndex]);
  }, [flashMode, setFlashMode]);

  const icon = useMemo(() => {
    switch (flashMode) {
      case FlashMode.auto:
        return 'flash-auto';
      case FlashMode.off:
        return 'flash-off';
      case FlashMode.on:
        return 'flash-on';
      default:
        return 'flash-on';
    }
  }, [flashMode]);

  return (
    <TouchableOpacity onPress={onToggleFlashHandler}>
      {flashMode === FlashMode.torch ? (
        <Ionicons name="flashlight" size={size} color={color} />
      ) : (
        <MaterialIcons name={icon} size={size} color={color} />
      )}
    </TouchableOpacity>
  );
  
}
