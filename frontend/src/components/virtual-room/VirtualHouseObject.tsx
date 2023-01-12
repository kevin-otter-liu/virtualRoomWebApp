import { VirtualHouseObjectPropI } from '../../types/virtual-room/VirtualHouseObjectPropI';
import { Fragment, useEffect, useState} from 'react';
import VirtualRoomObject from './VirtualRoomObject';



const VirtualHouseObject: React.FC<VirtualHouseObjectPropI> = (props) => {
  useEffect(()=>{
    console.log('virtualHouseObject rerendered')
    console.log('current virtualhouse in virtualHouseObject:')
    console.log(props.virtualHouse)
  })
  // call APi to load all VirtualRoomObjects from database
  // const virtualRoomObjects:<VirtualRoomData>=[];
  return (
    <Fragment>
      {/* Load all virtual Room Objects */}
      {props.virtualHouse.virtual_rooms.map((virtualRoom,index)=>{
        return <VirtualRoomObject key={`virtual-room-object-${index}`} createMode={props.createMode} virtualRoom={virtualRoom}></VirtualRoomObject>
      })}
    </Fragment>
  );
};

export default VirtualHouseObject;
