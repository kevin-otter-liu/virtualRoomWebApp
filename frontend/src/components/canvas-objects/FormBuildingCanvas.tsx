import {
  GizmoHelper,
  GizmoViewport,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import ax from 'axios';
import './FormBuildingCanvas.css';
import FormBuildingCanvasProp from '../../types/canvas-objects/FormBuildingCanvasProp';
import Building from './Building';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

const FormBuildingCanvas: React.FC<FormBuildingCanvasProp> = (props) => {

  return (
    <div className='canvas-container'>
      <Canvas camera={{ position: [0, 0, 0], far: 100000 }}>
        <group position={[0, -0.01, 0]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <Building
            url={props.rawBuildingDataUrl}
            ></Building>
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

export default FormBuildingCanvas;
