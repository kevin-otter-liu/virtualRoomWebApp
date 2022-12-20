import { useEffect, useRef, useState } from 'react';
import VirtualRoomCanvasPropI from '../../types/displays/VirtualRoomCanvasPropI';
import './VirtualRoomCanvas.css';
import ThreeCubeObject from './ThreeCubeObject';
import {
  PerspectiveCamera,
  PresentationControls,
} from '@react-three/drei';
import { ThreeEvent, useFrame} from '@react-three/fiber';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { Group, MeshBasicMaterial, Vector3 } from 'three';

const calculateCameraPosition = (cubeTopLeftPosition:Vector3,boxLength:number,boxWidth:number,boxHeight:number)=>{
  const cameraPosition =  new Vector3(cubeTopLeftPosition.x+boxLength/2,cubeTopLeftPosition.y+boxWidth/2,1)
  return cameraPosition
}

const calculateCubeCenterPosition=(cubeTopLeftPosition:Vector3,cubeLength:number,cubeWidth:number,cubeHeight:number)=>{
  const cubeCenterPosition =  new Vector3(cubeTopLeftPosition.x+cubeLength/2,cubeTopLeftPosition.y+cubeWidth/2,cubeTopLeftPosition.z+cubeHeight/2)
  // console.log(cubeCenterPosition)w
  return cubeCenterPosition
}

const VirtualRoomCanvas: React.FC<VirtualRoomCanvasPropI> = (props) => {
  console.log('viurtualroomcanvas called');

  // const image_urls = Array(6).fill('assets/default-walls/default.png');
  const image_urls = ['assets/img/0.jpg','assets/img/1.jpg','assets/img/2.jpg','assets/img/3.jpg','assets/img/4.jpg','assets/img/5.jpg'];
 
  const boxArgs: [
    width?: number | undefined,
    height?: number | undefined,
    depth?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number | undefined,
    depthSegments?: number | undefined
  ] = [5, 5, 5];

  // vairables
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

  const onFaceClickHandler = (e:ThreeEvent<MouseEvent>)=>{
    const faceIndex = Math.floor(e.faceIndex!/2)
    const currentMeshFace:MeshBasicMaterial = ref.current?.children[0].geometry.groups[faceIndex]
    console.log(currentMeshFace)
    props.setShowForm(true)
    props.setFaceIndex(faceIndex)
  }
  

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
          <ThreeCubeObject onFaceClick={onFaceClickHandler} position={[0,0,0]} urls={image_urls} boxArgs={boxArgs}></ThreeCubeObject>
        </group>
      </PresentationControls>
    </PerspectiveCamera>
  );
};

export default VirtualRoomCanvas;
