import { ThreeEvent } from '@react-three/fiber';
import { VirtualHouse } from '../contexts/responses/VirtualHouse';
import PropI from '../PropI'
export interface VirtualHouseObjectPropI extends PropI{
    virtualHouse: VirtualHouse
    createMode: boolean;
}

export namespace VirtualHouseObjectPropI{
}