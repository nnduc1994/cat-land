import React from 'react'

const GeneralContext = React.createContext()

export const UserProvider = GeneralContext.Provider
export const UserConsumer = GeneralContext.Consumer

export default GeneralContext