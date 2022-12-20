import PropI from '../PropI'

export default interface VirtualRoomCanvasPropI extends PropI{
    setShowForm:(showForm:boolean) => void;
    setFaceIndex:(faceIndex:number) => void;
    
}