// Toast.js
import React from 'react';
import './Toast.css';

const Toast = ({ message, show, onClose, type }) => {
  return (
    <div className={`toast ${show ? 'show' : ''} ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;
