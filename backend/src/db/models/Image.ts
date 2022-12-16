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
  declare caption: string | null;
  declare description: string | null;
}

Image.init(
  {
    image_able: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    caption: {
      type: DataTypes.TEXT,
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

export default Image;
