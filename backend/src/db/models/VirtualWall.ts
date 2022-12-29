import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  BelongsToCreateAssociationMixin,
} from 'sequelize';

import Image from './Image';

import dbConn from '../config';
import VirtualRoom from './VirtualRoom';

// defining Models: attributes at creation and attributes output from DB
class VirtualWall extends Model<
  InferAttributes<VirtualWall>,
  InferCreationAttributes<VirtualWall>
> {
  declare id: string;
  declare face: number;
  declare is_door: boolean;
  declare next_room: string | null;
  declare virtual_room_id: ForeignKey<VirtualRoom['id']>;
  declare image_id: CreationOptional<ForeignKey<VirtualRoom['id']>>;
  declare createImage: BelongsToCreateAssociationMixin<Image>;
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
  { sequelize: dbConn, modelName: 'virtual_wall' }
);

// foreign keys on VirtualWall
// image's fk is in virtual wall
VirtualWall.belongsTo(Image, {
  as: 'image',
  foreignKey: 'image_id',
});

export default VirtualWall;
