import { VirtualHouse } from '../responses/VirtualHouse';
import PropI from '../PropI'

export default interface VirtualHouseDescriptionBoxPropI extends PropI {
    imageSrc:string;
    description:string;
    createMode: boolean
    virtualHouse: VirtualHouse;
}