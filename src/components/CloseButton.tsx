import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { iconColor, iconSize } from '../contexts/components/components.context';
import { useCameraContext } from '../contexts/camera/camera.context';

export default function CloseButton() {
  const { onClose } = useCameraContext();

  if (!onClose) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onClose}>
      <MaterialIcons name="close" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}
