import DefaultResponse from './DefaultResponse';
export interface VirtualWall extends DefaultResponse {
  id: string;
  face: number;
  is_door: boolean;
  next_room: string | null;
  virtual_room_id: string;
  image_id: string | null;
}
