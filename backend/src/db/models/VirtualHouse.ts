import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyCreateAssociationMixin,
  ForeignKey,
} from 'sequelize';

import VirtualRoom from './VirtualRoom';

import dbConn from '../config';
import User from './User';

// defining Models: attributes at creation and attributes output from DB
class VirtualHouse extends Model<
  InferAttributes<VirtualHouse>,
  InferCreationAttributes<VirtualHouse>
> {
  declare id: string;
  declare description: string | null;
  declare user_id: ForeignKey<User['id']>;
  declare name: string | null;
  declare getVirtualRooms: HasManyGetAssociationsMixin<VirtualRoom>;
  declare addVirtualRoom: HasManyAddAssociationsMixin<VirtualRoom, number>;
  declare addVirtualRooms: HasManyAddAssociationsMixin<VirtualRoom, number>;
  declare removeVirtualRooms: HasManyRemoveAssociationMixin<
    VirtualRoom,
    number
  >;
  declare createVirtualRoom: HasManyCreateAssociationMixin<
    VirtualRoom,
    'virtual_house_id'
  >;
  declare createVirtualRooms: HasManyCreateAssociationMixin<
    VirtualRoom,
    'virtual_house_id'
  >;
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
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: dbConn, modelName: 'virtual_house' }
);

// define relationships
VirtualHouse.hasMany(VirtualRoom, {
  sourceKey: 'id',
  foreignKey: 'virtual_house_id',
  as: 'virtual_rooms',
  onDelete: 'CASCADE',
});

export default VirtualHouse;
