import PropI from "../PropI";

export default interface ModalPropI extends PropI{
    title: string;
    message:string;
    onConfirm: (event: React.MouseEvent)=>void;
}