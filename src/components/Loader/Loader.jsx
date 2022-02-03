import { Watch } from 'react-loader-spinner';
import { createPortal } from 'react-dom';
//import 'components/Modal/Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export function Loader() {
  return createPortal(
    <div className="Overlay">
      <Watch ariaLabel="loading-indicator" />
    </div>,
    modalRoot
  );
}
