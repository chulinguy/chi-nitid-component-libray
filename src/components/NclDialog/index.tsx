import React from 'react';
import Modal from 'react-modal';
import CloseButton from './CloseButton';
import './DialogWithOverlay.scss';

interface DialogWithOverlayInterface {
  clickHandler: () => void,
  isModalOn: boolean,
  extraClass?: string,
}

const DialogWithOverlay: React.FC<DialogWithOverlayInterface> = ({ clickHandler, isModalOn, children, extraClass = '' }) => (
  isModalOn ? (
    <Modal
      overlayClassName="overlay"
      className={`dialog ${extraClass}`}
      ariaHideApp={false}
      onRequestClose={clickHandler}
      isOpen={isModalOn}
      shouldCloseOnOverlayClick
    >
      { children }
      <CloseButton clickHandler={clickHandler} />
    </Modal>
  ) : null
);


export default DialogWithOverlay;
