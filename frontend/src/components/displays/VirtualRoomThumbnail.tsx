import VirtualRoomThumbnailPropI from '../../types/displays/VirtualRoomThumbnailPropI'


const VirtualRoomThumbnail:React.FC<VirtualRoomThumbnailPropI> = (props) =>{
    return(<div>
        <img loading='eager' src={props.src} alt={props.alt}></img>
    </div>)
}

export default VirtualRoomThumbnail;