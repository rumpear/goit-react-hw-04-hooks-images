import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onCloseModal }) => {
  useEffect(() => {
    const handleEscKeydown = e => {
      if (e.code === 'Escape') onCloseModal();
    };

    window.addEventListener('keydown', handleEscKeydown);
    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onCloseModal]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) onCloseModal();
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
