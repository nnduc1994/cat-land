import React, {createContext, useState, useMemo} from 'react'

export const SpinnerContext = createContext();

export const SpinnerContextProvider = (props) => {
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  const value = useMemo(() => ({
    isShowingSpinner,
    setIsShowingSpinner
  }), [isShowingSpinner])
  
  return (
    <SpinnerContext.Provider value={value}>
        {props.children}
    </SpinnerContext.Provider>
  );

}
