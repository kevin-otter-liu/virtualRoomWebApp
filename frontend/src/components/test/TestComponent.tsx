import {
  PerspectiveCamera,
  PresentationControls,
  useFBX,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BackSide, Vector3 } from 'three';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import TestProp from '../../types/test/TestProp';

const TestComponent: React.FC<TestProp> = (props) => {
  
  const renderBuilding = () =>{
    const fbx = useFBX(props.url)
    return <primitive object={fbx}/>
  }
  const { moveForward, moveBackward, moveLeft, moveRight, moveUp, moveDown } =
    useKeyboardControls();

  useFrame((state) => {
    if (moveForward) {
      state.camera.translateZ(-10);
    }
    if (moveBackward) {
      state.camera.translateZ(10);
    }
    if (moveRight) {
      state.camera.translateX(10);
    }
    if (moveLeft) {
      state.camera.translateX(-10);
    }
    if (moveUp) {
      state.camera.translateY(10);
    }

    if (moveDown) {
      state.camera.translateY(-10);
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
        <mesh position={new Vector3(0, 0, 0)}>
          {props.url !== '' && renderBuilding()}
        </mesh>
      </PresentationControls>
    </PerspectiveCamera>
  );
};

export default TestComponent;
