import { VirtualHouse } from '../responses/VirtualHouse';
import PropI from '../PropI';

export default interface VirtualHouseDescriptionBoxPropI extends PropI {
  imageSrc: string;
  description: string;
  virtualHouse: VirtualHouse;
}
