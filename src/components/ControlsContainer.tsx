import React from 'react';
import { View } from 'react-native';

export default function ControlsContainer({ children }: Props) {
  return <View className="flex flex-row justify-between p-4">{children}</View>;
}

type Props = {
  children?: React.ReactNode;
};
