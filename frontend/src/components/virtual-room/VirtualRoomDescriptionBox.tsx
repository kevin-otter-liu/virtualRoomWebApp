import VirtualRoomDescriptionBoxPropI from '../../types/virtual-room/VirtualRoomDescriptionBoxPropI'
import './VirtualRoomDescriptionBox.css'
import Button from '../ui/Button'

const VirtualRoomDescriptionBox:React.FC<VirtualRoomDescriptionBoxPropI> = (props) =>{

    const onClickHandler = (event:React.MouseEvent) =>{
        props.onClick(event);
    }
    return(
        <div className='virtual-room-description-box'>
            <img src={props.imageSrc}></img>
            <Button className='button-door' onClick={onClickHandler}>Enter Room</Button>
            <div>Hi</div>
        </div>
    )
}

export default VirtualRoomDescriptionBox;