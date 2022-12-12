import React, { createContext, useContext } from "react";

export type EverythingContext = {
  text: string | null;
};

export const EverythingContext = createContext<EverythingContext | null>(null);

export const EverythingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const text = "hello";
  return (
    <EverythingContext.Provider
      value={{
        text,
      }}
    >
      {children}
    </EverythingContext.Provider>
  );
};

export const useEverything = () => useContext(EverythingContext);
