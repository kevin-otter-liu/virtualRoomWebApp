import * as THREE from 'three';
import PlaneMeshPropI from '../../types/virtual-room/PlaneMeshPropI';

const PlaneMesh: React.FC<PlaneMeshPropI> = (props) => {
  return (
    <mesh position={props.position} rotation={props.rotation} scale={props.scale}>
      <planeGeometry />
      <meshBasicMaterial color='green' side={THREE.DoubleSide} />
    </mesh>
  );
};

export default PlaneMesh;
