import './VirtualHouseDescriptionBox.css';
import Button from '../ui/Button';
import React, { Fragment, useContext, useState } from 'react';
import VirtualRoomButton from '../ui/VirtualRoomButton';
import VirtualHouseDescriptionBoxPropI from '../../types/virtual-room/VirtualHouseDescriptionBoxPropI';
import VirtualHouseCanvas from './VirtualHouseCanvas';
import { VirtualHouseContext } from '../../context/virtual-house-context';
import { Canvas } from '@react-three/fiber';

const VirtualHouseDescriptionBox: React.FC<VirtualHouseDescriptionBoxPropI> = (
  props
) => {
  const [showVirtualHouse, setShowVirtualHouse] = useState<boolean>(false);
  const VHctx = useContext(VirtualHouseContext);

  const onEnterVirtualRoomHandler = (event: React.MouseEvent) => {
    setShowVirtualHouse(true);
    VHctx.setVirtualHouse(props.virtualHouse);
  };

  const onExitVirtualRoomHandler = (event: React.MouseEvent) => {
    setShowVirtualHouse(false);
    VHctx.setVirtualHouse(null);
  };

  return (
    <React.Fragment>
      <div className='virtual-room-description-box'>
        <div>{props.virtualHouse.name || props.virtualHouse.id}</div>
        <img src={props.imageSrc}></img>
        <Button type='button' onClick={onEnterVirtualRoomHandler}>
          Enter Room
        </Button>
        <div>{props.virtualHouse.description || 'no description yet'}</div>
      </div>
      
      
      {showVirtualHouse && (
        <Fragment>
          <div className='container'>
            <VirtualRoomButton type='button' onClick={onExitVirtualRoomHandler}>
              Exit Virtual Room
            </VirtualRoomButton>
            <Canvas>
              <VirtualHouseCanvas createMode={false}></VirtualHouseCanvas>
            </Canvas>
          </div>
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default VirtualHouseDescriptionBox;
