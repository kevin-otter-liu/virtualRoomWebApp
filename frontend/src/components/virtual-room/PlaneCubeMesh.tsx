import { Plane } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';
import PlaneCubeMeshPropI from '../../types/virtual-room/PlaneCubeMeshPropI';
import PlaneMesh  from './PlaneMesh';

const PlaneCubeMesh: React.FC<PlaneCubeMeshPropI> = (props) => {

    const arr:Array<number> = new Array<number>(6).fill(0);

  return (
    <group>

        {
            arr.map((_,index) =>{
                return<PlaneMesh key={index }position={new Vector3(0,0,0)} rotation={new Vector3(0,0,0)} scale={new Vector3(1,1,1)}></PlaneMesh>
            })
        }
    </group>
  );
};

export default PlaneCubeMesh;
