import { createContext } from "react";

const GeneralContext = createContext({});

export const GeneralProvider = (props: any) => {
  return (
    <GeneralContext.Provider value={{}}>
      {props.children}
    </GeneralContext.Provider>
  );
};
