import { VirtualHouse } from '../responses/VirtualHouse';

export default interface ImageFormPropI {
  // onFormSubmit: React.FormEventHandler<HTMLFormElement>;
  face: number;
  virtual_wall_id: string;
  virtual_room_id: string;
  onExitHandler: () => void;
  handlePostSubmitResponse: (newVirtualHouse: VirtualHouse) => void;
}
