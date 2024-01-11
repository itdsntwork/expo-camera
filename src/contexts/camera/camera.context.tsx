import { CameraType, FlashMode } from 'expo-camera';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type CameraContextProps = {
  flashMode: FlashMode;
  setFlashMode: (flashMode: FlashMode) => void;
  type: CameraType;
  setType: (type: CameraType) => void;
  zoom: number;
  augmentZoom: (zoom: number) => void;
  onClose?: () => void;
};

const defaultContext: CameraContextProps = {
  flashMode: FlashMode.on,
  setFlashMode: () => {},
  type: CameraType.back,
  setType: () => {},
  zoom: 0,
  augmentZoom: () => {},
};

const CameraContext = createContext<CameraContextProps>(defaultContext);

export const useCameraContext = () => useContext(CameraContext);

interface Action {
  payload: any;
  type: ActionType;
}

enum ActionType {
  SET_FLASH_MODE = 'SET_FLASH_MODE',
  SET_TYPE = 'SET_TYPE',
  SET_ZOOM = 'SET_ZOOM',
}

const reducer = (state: CameraContextProps, action: Action) => {
  const { type, payload } = action;
  switch (type) {
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

export const CameraContextProvider = ({ children, onClose }: ProviderProps) => {
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

  const value = useMemo(
    () => ({
      ...state,
      setFlashMode,
      setType,
      augmentZoom,
      onClose,
    }),
    [state, setFlashMode, setType, onClose, augmentZoom],
  );

  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  );
};

type ProviderProps = {
  onClose?: () => void;
  children: React.ReactNode;
};
