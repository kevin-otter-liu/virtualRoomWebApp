import DefaultResponse from './DefaultResponse';
import { VirtualRoom } from './VirtualRoom';
export interface VirtualHouse extends DefaultResponse {
  description: string;
  id: string;
  virtual_rooms: Array<VirtualRoom>;
}
