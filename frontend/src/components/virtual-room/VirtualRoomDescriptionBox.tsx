import VirtualRoomDescriptionBoxPropI from '../../types/virtual-room/VirtualRoomDescriptionBoxPropI';
import './VirtualRoomDescriptionBox.css';
import Button from '../ui/Button';
import React, { useState } from 'react';
import ImageForm from '../forms/ImageForm';
import VirtualRoomCanvas from './VirtualRoomCanvas';
import { Canvas } from '@react-three/fiber';
import VirtualRoomButton from '../ui/VirtualRoomButton';


const VirtualRoomDescriptionBox: React.FC<VirtualRoomDescriptionBoxPropI> = (
  props
) => {
  const [showVirtualRoom, setShowVirtualRoom] = useState<boolean>(false);
  const [faceIndex, setFaceIndex] = useState<number|null>(null);

  const [showForm,setShowForm] = useState<boolean>(false);

  const onEnterVirtualRoomHandler = (event: React.MouseEvent) => {
    setShowVirtualRoom(true);
  };

  const onExitVirtualRoomHandler = (event: React.MouseEvent) => {
    setShowVirtualRoom(false);
  };

  const onExitImageFormHandler = () => {
    setShowForm(false);
  };


  return (
    <React.Fragment>
      {showVirtualRoom && (
        <div className='container'>
          {showForm && <ImageForm text={`face index selected: ${faceIndex}`} onClick={onExitImageFormHandler}></ImageForm>}
          <VirtualRoomButton type='button' onClick={onExitVirtualRoomHandler}>Exit Virtual Room </VirtualRoomButton>
          <Canvas>
            <VirtualRoomCanvas setFaceIndex={setFaceIndex} setShowForm={setShowForm}></VirtualRoomCanvas>
          </Canvas>
        </div>
      )}

      <div className='virtual-room-description-box'>
        <img src={props.imageSrc}></img>
        <Button type='button' onClick={onEnterVirtualRoomHandler}>
          Enter Room
        </Button>
        <div>Hi</div>
      </div>
    </React.Fragment>
  );
};

export default VirtualRoomDescriptionBox;
