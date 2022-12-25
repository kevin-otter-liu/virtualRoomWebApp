import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import Image from './Image';

import dbConn from '../config';
import { v4 as uuidv4 } from 'uuid';

// defining Models: attributes at creation and attributes output from DB
class VirtualWall extends Model<
  InferAttributes<VirtualWall>,
  InferCreationAttributes<VirtualWall>
> {
  declare id: string;
  declare face: number;
  declare is_door: boolean;
  declare next_room: string;
}

VirtualWall.init(
  {
    // Virtual Wall Id of the next room behind the door
    next_room: {
      type: DataTypes.UUID,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    face: {
      type: DataTypes.INTEGER,
    },
    is_door: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize: dbConn }
);

// define relationships
Image.belongsTo(VirtualWall);

export default VirtualWall;
