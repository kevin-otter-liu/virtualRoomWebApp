import VirtualRoomDescriptionBoxPropI from '../../types/virtual-room/VirtualRoomDescriptionBoxPropI'
import './VirtualRoomDescriptionBox.css'
import Button from '../ui/Button'
import React,{useState} from 'react'
import ImageForm from '../forms/ImageForm'
import VirtualRoomCanvas from './VirtualRoomCanvas';


const VirtualRoomDescriptionBox:React.FC<VirtualRoomDescriptionBoxPropI> = (props) =>{

    const [showVirtualRoom, setShowVirtualRoom] = useState(false);

    const onEnterVirtualRoomHandler = (event: React.MouseEvent) =>{
      setShowVirtualRoom(true);
    }
  
    const onExitVirtualRoomHandler = (event: React.MouseEvent) =>{
      setShowVirtualRoom(false);
    }

    return(
        <React.Fragment>
          <ImageForm/>
            {showVirtualRoom && <VirtualRoomCanvas
          onExitVirtualRoomHandler={onExitVirtualRoomHandler}></VirtualRoomCanvas>}
          
          <div className='virtual-room-description-box'>
            <img src={props.imageSrc}></img>
            <Button type='button' onClick={onEnterVirtualRoomHandler}>Enter Room</Button>
            <div>Hi</div>
        </div>
        </React.Fragment>
        
    )
}

export default VirtualRoomDescriptionBox;