import { Fragment, useContext, useEffect, useState } from 'react';
import VirtualHouseCanvasPropI from '../../types/displays/VirtualHouseCanvasPropI';
import './VirtualHouseCanvas.css';
import VirtualHouseObject from './VirtualHouseObject';
import {
  Html,
  PerspectiveCamera,
  PresentationControls,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { VirtualHouseContext } from '../../context/virtual-house-context';
import VirtualRoomButton from '../ui/VirtualRoomButton';
import * as THREE from 'three'
import ax from 'axios';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

const VirtualHouseCanvas: React.FC<VirtualHouseCanvasPropI> = (props) => {
  const VHctx = useContext(VirtualHouseContext);
  useEffect(() => {
    console.log('virtualHouseCanvas rerendered');
    console.log('current virtualhouse in virtualHouseCanvas:');
    console.log(VHctx.virtualHouse);
  });
  const { viewport } = useThree();

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

    // exit Virtual Room Handler
    const onExitVirtualRoomHandler = (event: React.MouseEvent) => {
      VHctx.setVirtualHouse(null);
    };
  
    // upload virtual room
    const onUploadVirtualHouse = async (event: React.MouseEvent) => {
      if (!VHctx.virtualHouse) {
        return;
      }
      console.log(localStorage.getItem('access_token'));
  
      let virtualHouseId = VHctx.virtualHouse.id;
      let res = await axios.put(`/api/virtual-house/upload/${virtualHouseId}`);
    };
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
          <Fragment>
            <Html position={new THREE.Vector3(-viewport.width, viewport.height,-5)}>
              <VirtualRoomButton
                type='button'
                onClick={onExitVirtualRoomHandler}>
                Exit Virtual Room
              </VirtualRoomButton>
              <VirtualRoomButton type='button' onClick={onUploadVirtualHouse}>
                Upload
              </VirtualRoomButton>
            </Html>

            <VirtualHouseObject
              createMode={props.createMode}
              virtualHouse={VHctx.virtualHouse}></VirtualHouseObject>
          </Fragment>
        )}
      </PresentationControls>
    </PerspectiveCamera>
  );
};

export default VirtualHouseCanvas;
