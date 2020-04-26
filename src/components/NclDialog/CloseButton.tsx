import React from 'react';
import './DialogWithOverlay.scss';

interface CloseButtonInterface { 
  clickHandler: () => void,
}

const CloseButton: React.FC<CloseButtonInterface> = ({ clickHandler }) => (
  <button
    className="close-x"
    onClick={clickHandler}
    type="button"
  />
);

export default CloseButton;
