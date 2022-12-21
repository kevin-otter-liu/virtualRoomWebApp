import { Html } from '@react-three/drei';
import { Euler, Vector3 } from 'three';
import { WallTextObjectPropI } from '../../types/virtual-room/WallTextObjectPropI';

const WallTextObject: React.FC<WallTextObjectPropI> = (props) => {
  return (
    <Html
      scale={1}
      rotation={new Euler(...props.doorRotation)}
      position={new Vector3(...props.doorPosition)}
      transform>
      <div>Wall {props.index}</div>
      <button value={props.index} type='button'>
        Door {props.index}
      </button>
      <button value={props.index} type='button' onClick={props.onClick}>
        Add Image
      </button>
    </Html>
  );
};

export default WallTextObject
