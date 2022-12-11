import PropI from '../PropI';

export default interface ButtonPropI extends PropI{
    onClickHandler: (event:React.MouseEvent)=> void;
}
