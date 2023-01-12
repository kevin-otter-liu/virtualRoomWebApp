import DefaultResponse from './DefaultResponse';
import { Image } from './Image';
export interface VirtualWall extends DefaultResponse {
  id: string;
  face: number;
  is_door: boolean;
  next_room: string | null;
  virtual_room_id: string;
  image?: Image;
}
