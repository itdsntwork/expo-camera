import React, { useCallback } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  CaptureType,
  useCameraContext,
} from '../contexts/camera/camera.context';
import { Ionicons } from '@expo/vector-icons';

const iconSize = 60;

const Preview = () => {
  const { capture, setCapture } = useCameraContext();

  const onClose = useCallback(() => {
    setCapture(undefined);
  }, [setCapture]);

  return (
    <View>
      {capture?.type === CaptureType.PHOTO && (
        <>
          <Image
            style={{
              width: '100%',
              aspectRatio: capture.width / capture.height,
              resizeMode: 'contain',
            }}
            source={{ uri: capture.uri }}
          />
          <View className="absolute flex-row items-end justify-between w-full h-full p-12 pb-20">
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="checkmark" size={iconSize} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={iconSize} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Preview;
