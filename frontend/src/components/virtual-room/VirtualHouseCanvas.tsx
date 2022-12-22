import { useRef } from 'react';
import VirtualHouseCanvasPropI from '../../types/displays/VirtualHouseCanvasPropI';
import './VirtualHouseCanvas.css';
import VirtualHouseObject from './VirtualHouseObject';
import {
  PerspectiveCamera,
  PresentationControls,
} from '@react-three/drei';
import { useFrame} from '@react-three/fiber';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { Group} from 'three';


const VirtualHouseCanvas: React.FC<VirtualHouseCanvasPropI> = () => {

  const image_urls = ['assets/img/0.jpg','assets/img/1.jpg','assets/img/2.jpg','assets/img/3.jpg','assets/img/4.jpg','assets/img/5.jpg'];
 
  const boxArgs: Array<number> = [5, 5, 5];

  const ref:React.Ref<Group> =useRef(null!)


  const { moveForward, moveBackward, moveLeft, moveRight,moveUp,moveDown } =
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
    if(moveUp){
      state.camera.translateY(0.1)
    }

    if (moveDown){
      state.camera.translateY(-0.1)
    }

  });

  return (
    <PerspectiveCamera >
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
        <group ref={ref}>
          <VirtualHouseObject position={[0,0,0]} urls={image_urls} boxArgs={boxArgs}></VirtualHouseObject>
        </group>
      </PresentationControls>
    </PerspectiveCamera>
  );
};

export default VirtualHouseCanvas;
