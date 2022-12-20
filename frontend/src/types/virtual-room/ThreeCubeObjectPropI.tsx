import { ThreeEvent } from '@react-three/fiber';
import { Vector3 } from 'three';
import PropI from '../PropI'
export interface ThreeCubeObjectProp extends PropI{
    urls:string[];
    // boxArgs:[width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number | undefined];
    boxArgs:[width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number | undefined];

    onFaceClick: (e:ThreeEvent<MouseEvent>)=>void;
    position: Vector3;
}

export namespace ThreeCubeObjectProp{
}