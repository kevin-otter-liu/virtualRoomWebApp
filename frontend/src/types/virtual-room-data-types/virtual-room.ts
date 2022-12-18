import { VirtualWall } from './virtual-wall';

export class VirtualRoom {
  public wallNo: number;
  public completedWalls: number;

  // image direction it is stored in ['zp.jpg', 'zn.jpg', 'yp.jpg', 'yn.jpg', 'xp.jpg', 'xn.jpg']
  public virtualWalls: Array<VirtualWall>;
  public virtualDoors: Array<boolean>;
  //   public nextRooms: Array<VirtualRoom>;

  constructor(wallNo: number = 6) {
    this.completedWalls = 0;
    this.wallNo = wallNo;
    this.virtualWalls = new Array<VirtualWall>(this.wallNo);

    // initialise all walls for room
    this.virtualWalls.map((wall, index) => {
      return new VirtualWall(false, index as VirtualWall.Direction);
    });

    // iniitialise all doors of room set to false initially
    this.virtualDoors = new Array<boolean>(this.wallNo);
    this.virtualDoors.map(() => {
      return false;
    });

    // initialise all next virtual rooms to empty VirtualRoom instances initially
    // this.nextRooms = new Array<VirtualRoom>(this.wallNo);
    // this.nextRooms.map(() => {
    //   return new VirtualRoom();
    // });
  }

  public async loadWalls() {
    for (let index in this.virtualWalls) {
      const currVirtualWall = this.virtualWalls[index];
      await currVirtualWall.loadImage();
    }
  }

  public async createWall(
    formData: HTMLFormElement,
    is_door: boolean,
    direction: VirtualWall.Direction
  ) {
    const wall = this.virtualWalls[direction as number];
    await wall.createWall(formData, direction, is_door);
  }

  // creating the virtual room by adding images
}
