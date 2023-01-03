import PropI from "../PropI";

export default interface FixedModalPropI extends PropI{
    title: string;
    message:string;
    onClick: () => void;
}