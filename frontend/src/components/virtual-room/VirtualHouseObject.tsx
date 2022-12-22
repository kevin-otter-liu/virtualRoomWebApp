import { VirtualHouseObjectPropI } from '../../types/virtual-room/VirtualHouseObjectPropI';
import { Fragment} from 'react';
import VirtualRoomObject from './VirtualRoomObject';



const VirtualHouseObject: React.FC<VirtualHouseObjectPropI> = (props) => {

  // call APi to load all VirtualRoomObjects from database
  // const virtualRoomObjects:<VirtualRoomData>=[];

  return (
    <Fragment>
      {/* Load all virtual Room Objects */}
      <VirtualRoomObject urls={props.urls} position={props.position} boxArgs={props.boxArgs}></VirtualRoomObject>
      <VirtualRoomObject urls={props.urls} position={[5,0,0]} boxArgs={props.boxArgs}></VirtualRoomObject>
    </Fragment>
  );
};

export default VirtualHouseObject;
