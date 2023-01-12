import { VirtualHouse } from "../responses/VirtualHouse";
import { VirtualRoom } from "../responses/VirtualRoom";

interface VirtualHouseContextI {
    virtualHouse:VirtualHouse|null;
    setVirtualHouse:  React.Dispatch<React.SetStateAction<VirtualHouse | null>>;
    getNextRoomFromWallId: (currentWallId:string)=>VirtualRoom|null|void;
}

export default VirtualHouseContextI;