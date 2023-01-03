import { VirtualHouse } from "../responses/VirtualHouse";

interface VirtualHouseContextI {
    virtualHouse:VirtualHouse|null;
    setVirtualHouse:  React.Dispatch<React.SetStateAction<VirtualHouse | null>>;
}

export default VirtualHouseContextI;