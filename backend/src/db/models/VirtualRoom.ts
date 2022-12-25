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
import VirtualWall from './VirtualWall';

// defining Models: attributes at creation and attributes output from DB
class VirtualRoom extends Model<
  InferAttributes<VirtualRoom>,
  InferCreationAttributes<VirtualRoom>
> {
  declare id: string;
  declare userId: string;
  declare description: string | null;
  declare wallNo: number;
  declare completedWalls: number;
}

VirtualRoom.init(
  {
    wallNo: {
      type: DataTypes.INTEGER,
    },
    completedWalls: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { sequelize: dbConn }
);

// define relationships
VirtualRoom.hasMany(Image);
VirtualRoom.hasMany(VirtualWall);

export default VirtualRoom;
