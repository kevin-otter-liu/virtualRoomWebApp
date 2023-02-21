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
import Listing from './Listing';
import User from './User';

// defining Models: attributes at creation and attributes output from DB
class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: string;
  declare image_able: string; //"virtual-room-image" || "avatar-image" || listing_thumbnail
  declare url: CreationOptional<string>;
  declare user_id: ForeignKey<User['id']>;
  declare expire_at: Date;
  declare listing_id: CreationOptional<ForeignKey<Listing['id']>>;
}

Image.init(
  {
    image_able: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING(512),
    },
    expire_at: {
      type: DataTypes.DATE,
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
