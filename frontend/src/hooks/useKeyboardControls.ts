import React from 'react';

function actionByKey(key: string): string {
  const keys: { [key: string]: string } = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'moveUp',
    ShiftLeft: 'moveDown',
  };
  return keys[key];
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = React.useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
  });

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: true }));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      // Movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: false }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};
