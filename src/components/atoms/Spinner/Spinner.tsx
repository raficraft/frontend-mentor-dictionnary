import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return <div className={styles.spinner} data-testid='spinner'></div>;
};

export default Spinner;
