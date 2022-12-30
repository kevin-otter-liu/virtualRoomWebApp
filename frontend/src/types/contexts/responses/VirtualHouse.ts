import DefaultResponse from './DefaultResponse';
import { VirtualRoom } from './VirtualRoom';
export interface VirtualHouse extends DefaultResponse {
  id: string;
  description: string;
  name: string | null;
  virtual_rooms: Array<VirtualRoom>;
}
