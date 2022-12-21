import VirtualRoomDescriptionBoxPropI from '../../types/virtual-room/VirtualRoomDescriptionBoxPropI';
import './VirtualRoomDescriptionBox.css';
import Button from '../ui/Button';
import React, { useState } from 'react';
import VirtualRoomCanvas from './VirtualRoomCanvas';
import { Canvas } from '@react-three/fiber';
import VirtualRoomButton from '../ui/VirtualRoomButton';


const VirtualRoomDescriptionBox: React.FC<VirtualRoomDescriptionBoxPropI> = (
  props
) => {
  const [showVirtualRoom, setShowVirtualRoom] = useState<boolean>(false);

  const onEnterVirtualRoomHandler = (event: React.MouseEvent) => {
    setShowVirtualRoom(true);
  };

  const onExitVirtualRoomHandler = (event: React.MouseEvent) => {
    setShowVirtualRoom(false);
  };


  return (
    <React.Fragment>
      {showVirtualRoom && (
        <div className='container'>
          <VirtualRoomButton type='button' onClick={onExitVirtualRoomHandler}>Exit Virtual Room </VirtualRoomButton>
          <Canvas>
            <VirtualRoomCanvas ></VirtualRoomCanvas>
          </Canvas>
        </div>
      )}

      <div className='virtual-room-description-box'>
        <img src={props.imageSrc}></img>
        <Button type='button' onClick={onEnterVirtualRoomHandler}>
          Enter Room
        </Button>
        <div>Lorem Ipsum and a bunch of other stuff</div>
      </div>
    </React.Fragment>
  );
};

export default VirtualRoomDescriptionBox;
