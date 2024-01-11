import React from 'react';
import { View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useCameraContext } from '../contexts/camera/camera.context';

export default function ZoomHandler({ children }: Props) {
  const { augmentZoom: setZoom } = useCameraContext();

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    const value = (e.scale - 1);
    setZoom(value);
  });

  return (
    <GestureHandlerRootView className="flex-1 bg-transparent">
      <GestureDetector gesture={pinchGesture}>
        <View className="flex items-center justify-center flex-1 w-full">
          {children}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

type Props = {
  children: React.ReactNode;
};
