import React, { createContext, useContext, useReducer } from 'react'

export type CameraContextProps = {

}

const defaultContext: CameraContextProps = {}

const CameraContext = createContext<CameraContextProps>(defaultContext)

export const useCameraContext = () => useContext(CameraContext)

const reducer = (state: CameraContextProps, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

const CameraContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, defaultContext)

  return (
    <CameraContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CameraContext.Provider>
  )
}

type ProviderProps = {
  children: React.ReactNode
}