import { VirtualRoom } from '../contexts/responses/VirtualRoom';
import { VirtualWall } from '../contexts/responses/VirtualWall';

export interface VirtualRoomObjectPropI {
  virtualRoom: VirtualRoom;
  virtualWalls: Array<VirtualWall>;
  createMode: boolean;
}
