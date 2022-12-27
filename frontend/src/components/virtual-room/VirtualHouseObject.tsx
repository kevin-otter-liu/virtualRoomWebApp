import { VirtualHouseObjectPropI } from '../../types/virtual-room/VirtualHouseObjectPropI';
import { Fragment, useState} from 'react';
import VirtualRoomObject from './VirtualRoomObject';
import { VirtualRoom } from '../../types/contexts/responses/VirtualRoom';
import { VirtualHouse } from '../../types/contexts/responses/VirtualHouse';



const VirtualHouseObject: React.FC<VirtualHouseObjectPropI> = (props) => {

  // call APi to load all VirtualRoomObjects from database
  // const virtualRoomObjects:<VirtualRoomData>=[];
  const[thisVirtualHouse, setThisVirtualHouse] = useState<VirtualHouse>(props.virtualHouse)
  const [virtualRooms,setVirtualRooms] = useState<Array<VirtualRoom>>(props.virtualHouse.virtual_rooms)  
  return (
    <Fragment>
      {/* Load all virtual Room Objects */}
      {virtualRooms.map((virtualRoom,index)=>{
        return <VirtualRoomObject key={`virtual-room-object-${index}`} createMode virtualRoom={virtualRoom} virtualWalls={virtualRoom.virtual_walls}></VirtualRoomObject>
      })}
    </Fragment>
  );
};

export default VirtualHouseObject;
