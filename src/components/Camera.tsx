import { View } from 'react-native';
import { Viewfinder } from './Viewfinder';
import { CameraContextProvider } from '../contexts/camera/camera.context';

export default function Camera({ visible = true, onClose }: Props) {
  return (
    visible && (
      <CameraContextProvider onClose={onClose}>
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
};
