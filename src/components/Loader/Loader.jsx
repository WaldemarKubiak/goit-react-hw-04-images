import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import c from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={c.Loader}>
      {<BallTriangle color="#00BFFF" height={200} width={200} />}
    </div>
  );
};
