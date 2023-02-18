import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  Plane,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import ax, { AxiosResponse } from 'axios';
import {
  Fragment,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Building from '../components/canvas-objects/Building';
import './FormBuildingCanvas.css';
import { useControls } from 'leva';
import FormBuildingCanvasProp from '../types/forms/FormBuildingCanvasProp';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

const FormBuildingCanvas: React.FC<FormBuildingCanvasProp> = (props) => {
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: 'white',
    sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: 'white',
    fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  });

  return (
    <div className='canvas-container'>
      <Canvas camera={{ position: [0, 0, 0], far: 100000 }}>
      <group position={[0, -0.01, 0]}>
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

export default FormBuildingCanvas;
