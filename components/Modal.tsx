import { useClickOutside } from "../hooks/useClickOutside";
import { ModalContext } from "../contexts/modalContext";
import { clearBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { FC, HTMLProps, KeyboardEvent, useCallback, useContext, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './../styles/Modal.module.css';


const ESCAPE_KEY_CODE = 27;

interface Props extends HTMLProps<HTMLDivElement> {
  isVisible: boolean;
  onDismiss(isVisible: boolean): void;
}

export const Modal: FC<Props> = ({
  isVisible,
  onDismiss,
  children
}) => {
  const { modalRef: modalRefContainer } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { body } = document;

    if (!body) {
      return;
    }

    if (isVisible) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }

  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      modalRef.current?.focus();
    } else {
      modalRef.current?.blur();
    }
  }, [isVisible, modalRef]);

  useClickOutside(modalRef, () => {
    onDismiss(false);
    clearBodyScrollLocks();
  });

  const onClose = useCallback((): void => {
    onDismiss(false);
    clearBodyScrollLocks();
  }, [onDismiss]);
  const onKeyDown = useCallback((e: KeyboardEvent): void => {
    if (e.keyCode !== ESCAPE_KEY_CODE || !isVisible) {
      return;
    }
    onClose();
  }, [isVisible, onClose]);

  if (modalRefContainer === null || !isVisible) {
    return null;
  }

  const onClick = (): void => {
    onDismiss(false);
  }

  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.root}
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        role="dialog"
        aria-modal="true"
      >
        <button aria-label="close modal" className={styles.closeButton} onClick={onClick}>
          <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} size='xs' pull="right" />
        </button>
        {children}
      </div>
    </div>,
    modalRefContainer
  );
};
