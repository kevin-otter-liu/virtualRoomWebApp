import PropI from "../PropI";

export default interface ModalOverlayPropI extends PropI{
    title: string;
    message:string;
    onConfirm: (event: React.MouseEvent)=>void;
}