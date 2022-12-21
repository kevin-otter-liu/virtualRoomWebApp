import { ThreeEvent } from '@react-three/fiber';
import PropI from '../PropI'
export interface VirtualHouseObjectPropI extends PropI{
    urls:string[];
    // boxArgs:[width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number | undefined];
    boxArgs:Array<number>;

    // onFaceClick: (e:ThreeEvent<MouseEvent>)=>void;
    position: Array<number>;
}

export namespace VirtualHouseObjectPropI{
}