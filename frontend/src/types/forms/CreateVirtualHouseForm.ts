import { VirtualHouse } from '../responses/VirtualHouse';

export default interface CreateVirtualHousePropI {
  handlePostSubmit: (virtualHouseRes: VirtualHouse) => void;
}
