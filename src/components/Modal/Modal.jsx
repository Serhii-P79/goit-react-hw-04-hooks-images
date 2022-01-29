import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children, isLoader = false }) {
  useEffect(() => {
    if (!isLoader) {
      window.addEventListener('keydown', handleKeyDown);
      //  console.log("window.addEventListener('keydown', handleKeyDown)");
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        //   console.log("window.removeEventListener('keydown', handleKeyDown)");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  const handleOverlayClick = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoader: PropTypes.bool,
};
