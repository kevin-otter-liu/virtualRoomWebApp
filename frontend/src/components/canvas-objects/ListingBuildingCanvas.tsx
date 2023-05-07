import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import ax from 'axios';

import './ListingBuildingCanvas.css';
import Building from './Building';
import ListingBuildingCanvasProp from '../../types/canvas-objects/ListingBuildingCanvasProp';
import controlImgSrc from '../../../assets/ui/controls.png';
import KeyboardControlImage from './KeyboardControlImage';

const axios = ax.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

const ListingBuildingCanvas: React.FC<ListingBuildingCanvasProp> = (props) => {
  return (
    <div className='listing-canvas-container'>
      <button className='listing-building-button' onClick={props.onClose}>
        EXIT VIEW
      </button>
      <KeyboardControlImage />
      {/* <img className='listing-canvas-controls' src={controlImgSrc} /> */}
      <Canvas camera={{ position: [0, 0, 0], far: 10000 }}>
        <group frustumCulled={true} position={[0, -0.01, 0]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <Building url={props.rawBuildingDataUrl}></Building>
        </group>
        <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
          <GizmoViewport
            axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
            labelColor='white'
          />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};

export default ListingBuildingCanvas;
