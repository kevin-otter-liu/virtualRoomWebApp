import { Html } from '@react-three/drei';
import { Euler, Vector3 } from 'three';
import { WallTextObjectPropI } from '../../types/virtual-room/WallTextObjectPropI';
import './WallTextObject.css';

const WallTextObject: React.FC<WallTextObjectPropI> = (props) => {
  return (
    <Html
      scale={1}
      rotation={new Euler(...props.doorRotation)}
      position={new Vector3(...props.doorPosition)}
      transform>
      <div className='wall-texts'>Wall {props.index}</div>
      <button value={props.index} type='button' onClick={props.onImageButtonClick}>
        Add image
      </button>
      <button value={props.index} type='button' onClick={props.onDoorButtonClick}>
        Add Door
      </button>
    </Html>
  );
};

export default WallTextObject
