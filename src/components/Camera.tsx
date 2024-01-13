import { View } from 'react-native';
import { Viewfinder } from './Viewfinder';
import {
  CameraContextProvider,
  Capture,
} from '../contexts/camera/camera.context';

export default function Camera({
  visible = true,
  showPreview,
  onClose,
  onCapture,
}: Props) {
  return (
    visible && (
      <CameraContextProvider
        onClose={onClose}
        showPreview={showPreview}
        onCapture={onCapture}
      >
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
}

type Props = {
  visible?: boolean;
  onClose?: () => void;
  showPreview?: boolean;
  onCapture?: (capture?: Capture) => void;
};
