import {
  Camera,
  CameraCapturedPicture,
  CameraPictureOptions,
  CameraType,
  FlashMode,
} from 'expo-camera';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type CameraContextProps = {
  augmentZoom: (zoom: number) => void;
  camera?: Camera;
  cameraPictureOptions?: CameraPictureOptions;
  capture?: Capture;
  dispatchCapture: (capture?: Capture) => void;
  flashMode: FlashMode;
  onCapture: (capture?: Capture) => void;
  onClose?: () => void;
  setCamera: (camera: Camera) => void;
  setCapture: (previewCapture?: Capture) => void;
  setFlashMode: (flashMode: FlashMode) => void;
  setType: (type: CameraType) => void;
  showPreview?: boolean;
  type: CameraType;
  zoom: number;
};

const defaultContext: CameraContextProps = {
  augmentZoom: () => {},
  camera: undefined,
  capture: undefined,
  dispatchCapture: () => {},
  flashMode: FlashMode.on,
  onCapture: () => {},
  setCamera: () => {},
  setCapture: () => {},
  setFlashMode: () => {},
  setType: () => {},
  type: CameraType.back,
  zoom: 0,
};

const CameraContext = createContext<CameraContextProps>(defaultContext);

export const useCameraContext = () => useContext(CameraContext);

interface Action {
  payload: any;
  type: ActionType;
}

enum ActionType {
  SET_CAMERA = 'SET_CAMERA',
  SET_FLASH_MODE = 'SET_FLASH_MODE',
  SET_PREVIEW_CAPTURE = 'SET_PREVIEW_CAPTURE',
  SET_TYPE = 'SET_TYPE',
  SET_ZOOM = 'SET_ZOOM',
}

const reducer = (state: CameraContextProps, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SET_CAMERA:
      return {
        ...state,
        camera: payload,
      };
    case ActionType.SET_PREVIEW_CAPTURE:
      return {
        ...state,
        capture: payload,
      };
    case ActionType.SET_FLASH_MODE:
      return {
        ...state,
        flashMode: payload,
      };
    case ActionType.SET_TYPE:
      return {
        ...state,
        type: payload,
      };
    case ActionType.SET_ZOOM:
      return {
        ...state,
        zoom: payload,
      };
    default:
      return state;
  }
};

export const CameraContextProvider = ({
  children,
  onCapture: _onCapture,
  ...props
}: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultContext);

  const setFlashMode = useCallback((flashMode: FlashMode) => {
    dispatch({ type: ActionType.SET_FLASH_MODE, payload: flashMode });
  }, []);

  const setType = useCallback((type: CameraType) => {
    dispatch({ type: ActionType.SET_TYPE, payload: type });
  }, []);

  const augmentZoom = useCallback(
    (value: number) => {
      let zoom: number = Math.round(state.zoom + value * 100) / 100;
      if (zoom < 0) {
        zoom = 0;
      } else if (zoom > 1) {
        zoom = 1;
      }
      dispatch({ type: ActionType.SET_ZOOM, payload: zoom });
    },
    [state.zoom],
  );

  const setCamera = useCallback(
    (camera: Camera) => {
      dispatch({ type: ActionType.SET_CAMERA, payload: camera });
    },
    [dispatch],
  );

  const setCapture = useCallback(
    (previewCapture?: Capture) => {
      dispatch({
        type: ActionType.SET_PREVIEW_CAPTURE,
        payload: previewCapture,
      });
    },
    [dispatch],
  );

  const dispatchCapture = useCallback(
    (capture?: Capture) => {
      _onCapture?.(capture || state.capture);
      setCapture(undefined);
    },
    [dispatch, _onCapture, state.capture],
  );

  const onCapture = useCallback(
    (capture?: Capture) => {
      props.showPreview ? setCapture(capture) : dispatchCapture?.(capture);
    },
    [dispatchCapture, setCapture, props.showPreview],
  );

  const value = useMemo(
    () => ({
      ...state,
      ...props,
      onCapture,
      dispatchCapture,
      setCamera,
      setCapture,
      setFlashMode,
      setType,
      augmentZoom,
    }),
    [
      state,
      props,
      setFlashMode,
      setType,
      augmentZoom,
      setCamera,
      dispatchCapture,
      setCapture,
      onCapture,
    ],
  );

  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  );
};

type ProviderProps = {
  cameraPictureOptions?: CameraPictureOptions;
  children: React.ReactNode;
  onCapture?: (capture?: Capture) => void;
  onClose?: () => void;
  showPreview?: boolean;
};

export enum CaptureType {
  PHOTO,
  VIDEO,
}
export interface Capture extends CameraCapturedPicture {
  type: CaptureType;
}
