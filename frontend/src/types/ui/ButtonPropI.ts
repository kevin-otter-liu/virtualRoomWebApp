import PropI from '../PropI';

export default interface ButtonPropI extends PropI {
  onClick?: (event: React.MouseEvent) => void;
  type: 'button' | 'reset' | 'submit' | undefined;
  disabled?: boolean;
}
