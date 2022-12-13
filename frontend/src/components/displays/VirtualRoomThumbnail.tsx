import VirtualRoomThumbnailPropI from '../../types/displays/VirtualRoomThumbnailPropI'


const VirtualRoomThumbnail:React.FC<VirtualRoomThumbnailPropI> = (props) =>{
    return(<div>
        <img src={props.src} width='200px' height='200px'></img>
    </div>)
}

export default VirtualRoomThumbnail;