import React from 'react';
import { View, Text } from 'react-native';
import { useCameraContext } from '../contexts/camera/camera.context';
import { TouchableOpacity } from 'react-native';

export default function Preview() {
  const { setPreviewCapture } = useCameraContext();

  return (
    <View>
      <Text className="text-white">Preview</Text>
      <TouchableOpacity onPress={() => setPreviewCapture(undefined)}>
        <Text className="text-white">Save</Text>
      </TouchableOpacity>
    </View>
  );
}
