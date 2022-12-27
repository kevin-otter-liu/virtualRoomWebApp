import './VirtualHouseDescriptionBox.css';
import Button from '../ui/Button';
import React, { Fragment, useState } from 'react';
import VirtualRoomButton from '../ui/VirtualRoomButton';
import VirtualHouseDescriptionBoxPropI from '../../types/virtual-room/VirtualHouseDescriptionBoxPropI';


const VirtualHouseDescriptionBox: React.FC<VirtualHouseDescriptionBoxPropI> = (
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
        <Fragment>
          <VirtualRoomButton type='button' onClick={onExitVirtualRoomHandler}>Exit Virtual Room </VirtualRoomButton>
            {/* <VirtualHouseCanvas createMode={props.createMode}></VirtualHouseCanvas> */}
        </Fragment>
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

export default VirtualHouseDescriptionBox;
