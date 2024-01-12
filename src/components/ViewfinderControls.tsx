import React from 'react';
import ControlsContainer from './ControlsContainer';
import { View } from 'react-native';
import FlashSelector from './FlashSwitch';
import TypeSwitch from './TypeSwitch';
import CloseButton from './CloseButton';
import ShutterButton from './ShutterButton';

export default function ViewfinderControls() {
  return (
    <View className="flex-col content-between justify-between flex-1 w-full pt-6">
      <ControlsContainer>
        <CloseButton />
        <FlashSelector />
      </ControlsContainer>
      <ControlsContainer>
        <View className='w-12'></View>
        <ShutterButton />
        <TypeSwitch />
      </ControlsContainer>
    </View>
  );
}
