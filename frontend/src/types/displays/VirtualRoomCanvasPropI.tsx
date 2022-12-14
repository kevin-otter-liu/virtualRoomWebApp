import PropI from '../PropI'

export default interface VirtualRoomCanvasPropI extends PropI{
    onExitVirtualRoomHandler: (event:React.MouseEvent)=>void;
}