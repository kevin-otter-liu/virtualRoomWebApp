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
  declare direction: number;
  declare is_door: boolean;
  declare next_room: string;
}

VirtualWall.init(
  {
    next_room: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4(),
    },
    direction: {
      type: DataTypes.NUMBER,
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
