import DefaultResponse from './DefaultResponse';
import { VirtualWall } from './VirtualWall';
export interface VirtualRoom extends DefaultResponse {
  completed_walls: number;
  id: string;
  virtual_house_id: string;
  wall_no: number;
  x: number;
  y: number;
  z: number;
  length: number;
  height: number;
  depth: number;
  virtual_walls: Array<VirtualWall>;
}
