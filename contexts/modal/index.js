import React, { createContext, Fragment, useState } from "react";
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  return (
    <Fragment>
      <ModalContext.Provider value={{}}>{children}</ModalContext.Provider>
    </Fragment>
  );
};
