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
class VirtualRoom extends Model<
  InferAttributes<VirtualRoom>,
  InferCreationAttributes<VirtualRoom>
> {
  declare id: string;
  declare description: string | null;
  declare wallNo: number;
  declare completedWalls: number;
}

VirtualRoom.init(
  {
    wallNo: {
      type: DataTypes.NUMBER,
    },
    completedWalls: {
      type: DataTypes.NUMBER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4(),
    },
  },
  { sequelize: dbConn }
);

// define relationships
VirtualRoom.hasMany(Image);
VirtualRoom.hasMany(VirtualRoom);

export default VirtualRoom;
