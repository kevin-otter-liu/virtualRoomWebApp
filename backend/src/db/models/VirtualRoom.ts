import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
} from 'sequelize';

import Image from './Image';

import dbConn from '../config';
import { v4 as uuidv4 } from 'uuid';
import VirtualWall from './VirtualWall';
import VirtualHouse from './VirtualHouse';

// defining Models: attributes at creation and attributes output from DB
class VirtualRoom extends Model<
  InferAttributes<VirtualRoom>,
  InferCreationAttributes<VirtualRoom>
> {
  declare id: string;
  declare x: number;
  declare y: number;
  declare z: number;
  declare length: number;
  declare height: number;
  declare depth: number;

  declare description: string | null;
  declare wall_no: number;
  declare completed_walls: number;
  declare virtual_house_id: ForeignKey<VirtualHouse['id']>;

  declare removeVirtualRooms: HasManyRemoveAssociationMixin<
    VirtualWall,
    number
  >;
  declare getVirtualWall: HasManyCreateAssociationMixin<VirtualWall>;
  declare getVirtualWalls: HasManyCreateAssociationMixin<VirtualWall>;
  declare createVirtualWall: HasManyCreateAssociationMixin<
    VirtualWall,
    'virtual_room_id'
  >;
  declare createVirtualWalls: HasManyCreateAssociationMixin<
    VirtualWall,
    'virtual_room_id'
  >;
}

VirtualRoom.init(
  {
    x: {
      type: DataTypes.INTEGER,
    },
    y: {
      type: DataTypes.INTEGER,
    },
    z: {
      type: DataTypes.INTEGER,
    },
    length: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    depth: {
      type: DataTypes.INTEGER,
    },
    wall_no: {
      type: DataTypes.INTEGER,
    },
    completed_walls: {
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
  },
  { sequelize: dbConn, modelName: 'virtual_room' }
);

// define relationships
VirtualRoom.hasMany(VirtualWall, {
  sourceKey: 'id',
  foreignKey: 'virtual_room_id',
  as: 'virtual_walls',
});

export default VirtualRoom;
