import React, { createContext, useContext } from "react";

export type EverythingContext = {
  text: string | null;
};

export const EverythingContext = createContext<EverythingContext | null>(null);

export const EverythingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const text = "hello";
  // user
  // wallet
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

// TODO: at init for the EverythingContext, pass the wallet and the account
// Then useCreator can access both

// OR we load it directly
// I kind of want the blockchain to not matter. You can use whatever one you want, because I don't really see why not.
