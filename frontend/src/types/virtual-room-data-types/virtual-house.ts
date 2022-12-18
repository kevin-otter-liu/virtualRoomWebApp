import { VirtualRoom } from './virtual-room';
import { VirtualWall } from './virtual-wall';

export class VirtualHouse {
  public entryRoom: VirtualRoom;
  public currRoom: VirtualRoom;
  constructor() {
    this.entryRoom = new VirtualRoom();
    this.currRoom = this.entryRoom;
  }

  public async createWall(
    formData: HTMLFormElement,
    is_door: boolean,
    direction: VirtualWall.Direction
  ) {
    await this.entryRoom.createWall(formData, is_door, direction);
  }

  public async loadRoom(virtualRoom: VirtualRoom) {
    await virtualRoom.loadWalls();
  }

  public async loadAllRooms() {
    // start BFS from entry ROOM
    const queue: Array<VirtualRoom> = [];
    queue.push(this.entryRoom);

    while (queue.length > 0) {
      // render current room
      let currentRoom = queue.shift();
      await currentRoom?.loadWalls();
      for (let nextRoom of this.entryRoom.nextRooms) {
        // only rooms with more than 1 compelted walls
        if (nextRoom.completedWalls > 0) {
          queue.push(nextRoom);
        }
      }
    }
  }
}
