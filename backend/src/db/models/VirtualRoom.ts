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
}

VirtualRoom.init(
  {
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

export default VirtualRoom;
