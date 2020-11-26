import React from 'react';
import {
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size/throttled';
import 'styles/normalize.scss';
import icon from 'images/device-rotation.svg';
import styles from './RotateScreen.scss';
import useBrowser from 'hooks/useBrowser';

const MIN_HEIGHT = 500;

const RotateScreen = () => {
  const browser = useBrowser();
  const width = useWindowWidth();
  const height = useWindowHeight();

  const isRotateScreen =
    browser.platform.type === 'mobile' && width > height && height < MIN_HEIGHT;

  if (!isRotateScreen) {
    return null;
  }

  return (
    <div className={styles.root}>
      <img src={icon} alt="icon" />
      <h1>Please rotate your device</h1>
      <p>This page is best viewed in portrait orientation</p>
    </div>
  );
};

export default RotateScreen;
