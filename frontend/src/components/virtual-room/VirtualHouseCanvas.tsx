import { useContext, useEffect, useState } from 'react';
import VirtualHouseCanvasPropI from '../../types/displays/VirtualHouseCanvasPropI';
import './VirtualHouseCanvas.css';
import VirtualHouseObject from './VirtualHouseObject';
import {
  PerspectiveCamera,
  PresentationControls,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { VirtualHouse } from '../../types/responses/VirtualHouse';
import { VirtualHouseContext } from '../../context/virtual-house-context';

const VirtualHouseCanvas: React.FC<VirtualHouseCanvasPropI> = (props) => {
  // const [virtualHouse, setVirtualHouse] = useState<VirtualHouse | null>(
  //   props.virtualHouse
  // );
  const VHctx = useContext(VirtualHouseContext)
  useEffect(()=>{
    console.log('virtualHouseCanvas rerendered')
    console.log('current virtualhouse in virtualHouseCanvas:')
    console.log(VHctx.virtualHouse)
  })

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
            {VHctx.virtualHouse && (
              <VirtualHouseObject
                createMode={props.createMode}
                virtualHouse={VHctx.virtualHouse}></VirtualHouseObject>
            )}
          </PresentationControls>
        </PerspectiveCamera>
      
  );
};

export default VirtualHouseCanvas;
