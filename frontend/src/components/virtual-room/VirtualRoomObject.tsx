import { useTexture } from '@react-three/drei';
import { BackSide, Vector3 } from 'three';
import { VirtualRoomObjectPropI } from '../../types/virtual-room/VirtualRoomObjectPropI';

const VirtualRoomObject: React.FC<VirtualRoomObjectPropI> = (props) => {
  // put default pic as empty pics
    props.urls.map((url) => {
    url === '' ? 'assets/default-walls/default.png' : url;
  });
  const textures = useTexture<string[]>(props.urls);

  return (
    <mesh position={new Vector3(...props.position)}>
      <boxGeometry args={props.boxArgs} />
      {textures.map((texture, index) => {
        const meshMaterial = (
          <meshBasicMaterial
            key={index}
            attach={`material-${index}`}
            map={texture}
            side={BackSide}
          />
        );
        return meshMaterial;
      })}
    </mesh>
  );
};

export default VirtualRoomObject;
