import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  BelongsToCreateAssociationMixin,
} from 'sequelize';

import dbConn from '../config';
import User from './User';
import VirtualWall from './VirtualWall';

// defining Models: attributes at creation and attributes output from DB
class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: string;
  declare image_able: string; //"virtual-room-image" || "avatar-image"
  declare url: CreationOptional<string>;
  declare user_id: ForeignKey<User['id']>;
  // declare userId: string;
}

Image.init(
  {
    image_able: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING(512),
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  { sequelize: dbConn, modelName: 'image' }
);

export default Image;
