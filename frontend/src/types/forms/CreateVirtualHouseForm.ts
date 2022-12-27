export default interface CreateVirtualHousePropI {
  onFormSubmit: React.FormEventHandler<HTMLFormElement>;
  onExitForm: () => void;
  onDescriptionChange: React.ChangeEventHandler<HTMLInputElement>;
  onXChange: React.ChangeEventHandler<HTMLInputElement>;
  onYChange: React.ChangeEventHandler<HTMLInputElement>;
  onZChange: React.ChangeEventHandler<HTMLInputElement>;
  onNameChange: React.ChangeEventHandler<HTMLInputElement>;
  onLengthChange: React.ChangeEventHandler<HTMLInputElement>;
  onHeightChange: React.ChangeEventHandler<HTMLInputElement>;
  onDepthChange: React.ChangeEventHandler<HTMLInputElement>;
}
