import { Html } from '@react-three/drei';
import { Euler, Vector3 } from 'three';
import { WallTextObjectPropI } from '../../types/virtual-room/WallTextObjectPropI';
import './WallTextObject.css';

const WallTextObject: React.FC<WallTextObjectPropI> = (props) => {
  const createModeHTML = 
    <Html
      scale={props.scale}
      rotation={new Euler(...props.doorRotation)}
      position={new Vector3(...props.doorPosition)}
      zIndexRange={[10, 0]}
      transform>
      <div className='wall-texts'>Wall {props.index}</div>
      <button
        value={props.index}
        type='button'
        onClick={props.onImageButtonClick}>
        Add image
      </button>
      {props.showDoorButton && (
        <button
          value={props.index}
          type='button'
          onClick={props.onDoorButtonClick}>
          Add Door
        </button>
      )}
    </Html>

  const viewModeHTML = 
    <Html
      scale={props.scale}
      rotation={new Euler(...props.doorRotation)}
      position={new Vector3(...props.doorPosition)}
      zIndexRange={[10, 0]}
      transform>
      <div className='wall-texts'>Wall {props.index}</div>
      <button value={props.index} onClick={props.onNextRoomClick}>
        next room
        </button>
  </Html>

  return props.createMode?createModeHTML:viewModeHTML
};

export default WallTextObject;
