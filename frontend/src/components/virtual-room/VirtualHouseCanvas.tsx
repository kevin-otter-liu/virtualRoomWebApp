import { useEffect, useState } from 'react';
import VirtualHouseCanvasPropI from '../../types/displays/VirtualHouseCanvasPropI';
import './VirtualHouseCanvas.css';
import VirtualHouseObject from './VirtualHouseObject';
import {
  PerspectiveCamera,
  PresentationControls,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { VirtualHouse } from '../../types/contexts/responses/VirtualHouse';

const VirtualHouseCanvas: React.FC<VirtualHouseCanvasPropI> = (props) => {
  const [virtualHouse, setVirtualHouse] = useState<VirtualHouse | null>(
    props.virtualHouse
  );
  useEffect(()=>{
    console.log(virtualHouse)
  })

  // useEffect(() => {
  //   const createVirtualHouse = async () => {
  //     if (props.virtualHouse) {
  //       setVirtualHouse(virtualHouse);
  //     } else {
  //       console.log('here');
  //     }
  //   };

  //   createVirtualHouse();
  // }, []);

  const { moveForward, moveBackward, moveLeft, moveRight, moveUp, moveDown } =
    useKeyboardControls();

  useFrame((state) => {
    if (moveForward) {
      state.camera.translateZ(-0.1);
    }
    if (moveBackward) {
      state.camera.translateZ(0.1);
    }
    if (moveRight) {
      state.camera.translateX(0.1);
    }
    if (moveLeft) {
      state.camera.translateX(-0.1);
    }
    if (moveUp) {
      state.camera.translateY(0.1);
    }

    if (moveDown) {
      state.camera.translateY(-0.1);
    }
  });

  return (
        <PerspectiveCamera>
          <PresentationControls
            enabled={true} // the controls can be disabled by setting this to false
            global={false} // Spin globally or by dragging the model
            cursor={true} // Whether to toggle cursor style on drag
            snap={false} // Snap-back to center (can also be a spring config)
            speed={1} // Speed factors
            zoom={1} // Zoom factor when half the polar-max is reached
            rotation={[0, 0, 0]} // Default rotation
            polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
            azimuth={[-Infinity, Infinity]} // Horizontal limits
          >
            {virtualHouse && (
              <VirtualHouseObject
                createMode={props.createMode}
                virtualHouse={virtualHouse}></VirtualHouseObject>
            )}
          </PresentationControls>
        </PerspectiveCamera>
      
  );
};

export default VirtualHouseCanvas;