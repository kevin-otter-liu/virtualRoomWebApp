import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';

import dbConn from '../config';
import VirtualWall from './VirtualWall';

// defining Models: attributes at creation and attributes output from DB
class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: string;
  declare image_able: string; //"virtual-room-image" || "avatar-image"
  declare url: CreationOptional<string>;
  // declare userId: string;
  declare virtual_wall_id: ForeignKey<VirtualWall['id']>;
}

Image.init(
  {
    image_able: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
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
