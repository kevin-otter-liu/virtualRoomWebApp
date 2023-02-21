import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from 'sequelize';

import dbConn from '../config';
import Building from './Building';
import User from './User';
import Image from './Image';

// defining Models: attributes at creation and attributes output from DB
class Listing extends Model<
  InferAttributes<Listing>,
  InferCreationAttributes<Listing>
> {
  declare id: string;
  declare user_id: ForeignKey<User['id']>;
  declare name: string;
  declare location: string;
  declare description: string;
  declare developer: string;
  declare expire_at: Date;
  declare file_extension: string;
}

Listing.init(
  {
    name: {
      type: DataTypes.STRING(512),
    },
    location: {
      type: DataTypes.STRING(512),
    },
    developer: {
      type: DataTypes.STRING(512),
    },
    description: {
      type: DataTypes.STRING(512),
    },
    file_extension: {
      type: DataTypes.STRING(16),
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
  { sequelize: dbConn, modelName: 'listing' }
);

Listing.hasOne(Building, {
  sourceKey: 'id',
  foreignKey: 'listing_id',
  as: 'building',
  onDelete: 'CASCADE',
});

Listing.hasOne(Image, {
  sourceKey: 'id',
  foreignKey: 'listing_id',
  as: 'image',
  onDelete: 'CASCADE',
});

Image.belongsTo(Listing, {
  foreignKey: 'listing_id',
  onDelete: 'CASCADE',
});

export default Listing;
