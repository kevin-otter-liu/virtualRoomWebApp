import PropI from '../PropI'

export default interface VirtualRoomDescriptionBoxPropI extends PropI {
    imageSrc:string;
    description:string;
    onClick: (event: React.MouseEvent) => void;
}