import './VirtualHouseDescriptionBox.css';
import Button from '../ui/Button';
import React, { Fragment, useContext, useState } from 'react';
import VirtualRoomButton from '../ui/VirtualRoomButton';
import VirtualHouseDescriptionBoxPropI from '../../types/virtual-room/VirtualHouseDescriptionBoxPropI';
import VirtualHouseCanvas from './VirtualHouseCanvas';
import { VirtualHouseContext } from '../../context/virtual-house-context';
import { Canvas } from '@react-three/fiber';
import axios from 'axios';

const VirtualHouseDescriptionBox: React.FC<VirtualHouseDescriptionBoxPropI> = (
  props
) => {
  const [showBox, setShowBox] = useState<boolean>(true);

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

  const onDeleteVirtualRoomHandler = async () => {
    try {
      let res = await axios.delete(
        `http://${import.meta.env.VITE_API_HOST}/api/virtual-house/${props.virtualHouse.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      if (res.status === 200) {
        VHctx.setVirtualHouse(null);
        setShowBox(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {showBox && (
        <Fragment>
          <div className='virtual-room-description-box'>
            <div>{props.virtualHouse.name || props.virtualHouse.id}</div>
            <img src={props.imageSrc}></img>
            <Button type='button' onClick={onEnterVirtualRoomHandler}>
              Enter Room
            </Button>
            <div>{props.virtualHouse.description || 'no description yet'}</div>
            <Button type='button' onClick={onDeleteVirtualRoomHandler}>
              Delete Room
            </Button>
          </div>
        </Fragment>
      )}
      {showVirtualHouse && (
        <div className='container'>
          <VirtualRoomButton type='button' onClick={onExitVirtualRoomHandler}>
            Exit Virtual Room
          </VirtualRoomButton>
          <Canvas>
            <VirtualHouseCanvas createMode={false}></VirtualHouseCanvas>
          </Canvas>
        </div>
      )}
    </Fragment>
  );
};

export default VirtualHouseDescriptionBox;
