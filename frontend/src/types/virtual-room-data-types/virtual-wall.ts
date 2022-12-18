import axios from 'axios';
import { VirtualRoom } from './virtual-room';

export class VirtualWall {
  public direction: VirtualWall.Direction;
  public image_url: string | null;
  public is_door: boolean;
  public next_room: VirtualRoom | null;

  constructor(is_door: boolean = false, direction: VirtualWall.Direction) {
    this.image_url = null;
    this.direction = direction;
    this.is_door = is_door;
    this.next_room = null;
  }

  // adds an image to a wall
  public async createWall(
    formData: HTMLFormElement,
    direction: VirtualWall.Direction,
    is_door: boolean
  ) {
    // create the next Virtual room is if the wall is door
    if (is_door) {
      this.next_room = new VirtualRoom();
    }

    // add image to s3
    const response = await axios.post(
      `http://localhost:3000/virtual-room/image/${direction}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // get image url from the server
    const image_response = await axios.get(
      `http://localhost:3000/virtual-room/image/${direction}`
    );

    this.direction = direction;
    this.image_url = image_response.data.url;
  }

  // loads image for a user
  public async loadImage() {
    // get image url from the server
    const image_response = await axios.get(
      `http://localhost:3000/virtual-room/image/${this.direction}`
    );

    this.image_url = image_response.data.url;
    this.is_door = image_response.data.is_door;
  }
}

// define namespace
export namespace VirtualWall {
  export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | null;
}
