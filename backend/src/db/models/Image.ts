import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import dbConn from '../config';
import { v4 as uuidv4 } from 'uuid';

// defining Models: attributes at creation and attributes output from DB
class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: string;
  declare image_able: string; //"virtual-room-image" || "avatar-image"
  declare url: CreationOptional<string>;
  // declare userId: string;
  // declare virtualWallId: string;
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
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    // virtualWallId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  },
  { sequelize: dbConn }
);

export default Image;
