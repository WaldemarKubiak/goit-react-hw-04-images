import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import c from './Modal.module.css';

export const Modal = ({ image, description, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModalWindow);
    // console.log('Modal: added');

    return () => {
      window.removeEventListener('keydown', closeModalWindow);
      // console.log('Modal: removed');
    };
  });

  const closeModalWindow = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={c.Overlay} onClick={closeModalWindow}>
      <div className={c.Modal}>
        <img src={image} alt={description} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
