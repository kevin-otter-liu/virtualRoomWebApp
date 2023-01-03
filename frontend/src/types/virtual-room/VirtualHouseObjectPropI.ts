import { VirtualHouse } from '../responses/VirtualHouse';
import PropI from '../PropI';
export interface VirtualHouseObjectPropI extends PropI {
  virtualHouse: VirtualHouse;
  createMode: boolean;
}

export namespace VirtualHouseObjectPropI {}
