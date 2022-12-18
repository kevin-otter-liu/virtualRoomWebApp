import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import VirtualRoom from './VirtualRoom';

import dbConn from '../config';
import { v4 as uuidv4 } from 'uuid';

// defining Models: attributes at creation and attributes output from DB
class VirtualHouse extends Model<
  InferAttributes<VirtualHouse>,
  InferCreationAttributes<VirtualHouse>
> {
  declare id: string;
  declare description: string | null;
}

VirtualHouse.init(
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
VirtualHouse.hasMany(VirtualRoom);

export default VirtualHouse;
