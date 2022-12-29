import { VirtualHouse } from '../contexts/responses/VirtualHouse';
import PropI from '../PropI'

export default interface VirtualHouseCanvasPropI extends PropI{
    createMode: boolean;
    virtualHouse: VirtualHouse|null;
}