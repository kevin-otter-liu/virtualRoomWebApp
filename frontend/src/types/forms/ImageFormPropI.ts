export default interface ImageFormPropI {
  onFormSubmit: React.FormEventHandler<HTMLFormElement>;
  onExitForm: () => void;
  onImageInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onTextInputChange: React.ChangeEventHandler<HTMLInputElement>;
  description: string;
  text: string;
}
