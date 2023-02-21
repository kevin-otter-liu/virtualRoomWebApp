import {
  PerspectiveCamera,
  PresentationControls,
  useTexture,
  // useFBX,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BackSide, Material, Mesh, Vector3 } from 'three';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import BuildingProp from '../../types/canvas-objects/BuildingProp';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


const Building: React.FC<BuildingProp> = (props) => {
  let texture = useTexture('/assets/textures/white.png')

  const renderBuilding = () => {
    // const fbx = useFBX(props.url)
    const loader = new FBXLoader()
    const fbx = useLoader(FBXLoader, props.url);
    // console.log(fbx)
    fbx.traverse((child)=>{
      if(child instanceof Mesh){
        let materials:Material[] = child.material
        materials.forEach((material,i)=>{
          // console.log(material.name)
          child.material[i].map = texture
        })

        
      }

    })
    
    return <primitive object={fbx} />;
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
