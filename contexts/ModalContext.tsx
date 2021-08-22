import React, { createContext, FC, useCallback, useState } from 'react';

export interface ModalConfig {
  modalRef: Element | null;
  setModalRef(node: HTMLDivElement): void;
}

export const ModalContext = createContext<ModalConfig>({ modalRef: null, setModalRef: () => null });

export const ModalContextProvider: FC = ({ children }) => {
  const [ref, setRef] = useState(null);
  const onModalRefChange = useCallback((node) => {
    if (node) {
      setRef(node);
    }
  }, []);

  return (
    <ModalContext.Provider value={Object.freeze({ modalRef: ref, setModalRef: onModalRefChange })}>
      {children}
    </ModalContext.Provider>
  )
}