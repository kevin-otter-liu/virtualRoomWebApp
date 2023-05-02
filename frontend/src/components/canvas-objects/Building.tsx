import {
  Html,
  PerspectiveCamera,
  PresentationControls,
  useFBX,
  useProgress,
  useTexture,
  // useFBX,
} from '@react-three/drei';
import { useFrame} from '@react-three/fiber';
import { Material, Mesh, Vector3 } from 'three';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import BuildingProp from '../../types/canvas-objects/BuildingProp';
import { Suspense } from 'react';
import textureUrl from '../../../assets/textures/white.png'

const Loader = () => {
  const { progress } = useProgress();
  console.log('progress', progress);
  return <Html center>{progress} % loaded</Html>;
};

const Building: React.FC<BuildingProp> = (props) => {
  let texture = useTexture(textureUrl);
  const renderBuilding = () => {
    const fbx = useFBX(props.url);

    fbx.traverse((child) => {
      if (child instanceof Mesh) {
        console.log(child);
        let materials: Material[] = child.material;
        materials.forEach((material, i) => {
          console.log(material)
          child.material[i].map = texture;
        });
      }
    });

    return (
      <Suspense fallback={<Loader />}>
        <primitive object={fbx} />
      </Suspense>
    );
  };
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
    <PerspectiveCamera getObjectsByProperty={undefined}>
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

export default Building;
