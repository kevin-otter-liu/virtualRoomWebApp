export default interface ImageFormPropI {
  // onFormSubmit: React.FormEventHandler<HTMLFormElement>;
  face: number;
  virtual_wall_id: string;
  virtual_room_id: string;
  onExitHandler: () => void;
  handlePostSubmitResponse: (
    virtual_room_id: string,
    face: number,
    is_door: boolean,
    image_url: string,
    image_id: string
  ) => void;
}
