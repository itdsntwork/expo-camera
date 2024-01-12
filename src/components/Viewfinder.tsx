import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ViewfinderControls from './ViewfinderControls';
import { useCameraContext } from '../contexts/camera/camera.context';
import ZoomHandler from './ZoomHandler';
import Preview from './Preview';
const { useCameraPermissions } = Camera;

function Viewfinder() {
  const { type, flashMode, zoom, setCamera, previewCapture } =
    useCameraContext();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const cameraRef = useRef<Camera>(null);

  if (!cameraPermission) {
    requestCameraPermission();
  }

  const { ratio, imagePadding } = useRatioProps(cameraRef?.current, type);

  useEffect(() => {
    if (!cameraRef.current) return;
    setCamera(cameraRef.current);
  }, [cameraRef.current]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
      }}
    >
      {previewCapture ? (
        <Preview />
      ) : (
        <Camera
          ref={cameraRef}
          style={[
            { flex: 1, marginTop: imagePadding, marginBottom: imagePadding },
          ]}
          type={type}
          ratio={ratio}
          flashMode={flashMode}
          zoom={zoom}
        >
          <View className="flex-1 bg-transparent">
            <ZoomHandler>
              <ViewfinderControls />
            </ZoomHandler>
          </View>
        </Camera>
      )}
    </View>
  );
}

const useRatioProps = (camera: Camera | null, type: CameraType) => {
  const [ratio, setRatio] = useState<string>('4:3');
  const [imagePadding, setImagePadding] = useState<number>(0);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    async function prepareRatio() {
      if (!camera) return;
      const { height, width } = Dimensions.get('window');
      const screenRatio = height / width;
      const ratios = await camera.getSupportedRatiosAsync();
      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      const distances: { [key: string]: number } = {};
      const realRatios: { [key: string]: number } = {};
      let desiredRatio: string | null = '4:3';
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance!;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2,
      );

      setImagePadding(remainder);
      setRatio(desiredRatio);
    }

    prepareRatio();
  }, [camera, type]);

  return { ratio, imagePadding };
};

export { Viewfinder };
