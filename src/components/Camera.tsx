import { View } from 'react-native';
import { Viewfinder } from './Viewfinder';
import {
  CameraContextProvider,
  Capture,
} from '../contexts/camera/camera.context';
import { memo } from 'react';

export const Camera = memo(({ visible = true, ...providerProps }: Props) => {
  return (
    visible && (
      <CameraContextProvider {...providerProps}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            justifyContent: 'center',
          }}
        >
          <Viewfinder />
        </View>
      </CameraContextProvider>
    )
  );
});

type Props = {
  visible?: boolean;
  onClose?: () => void;
  showPreview?: boolean;
  onCapture?: (capture?: Capture) => void;
  pickerEnabled?: boolean;
};
