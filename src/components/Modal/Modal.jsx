import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow, Picture } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) onClose();
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalWindow>
        <Picture src={src} alt={alt} />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
}

export default Modal;
