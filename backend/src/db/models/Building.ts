import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';

import dbConn from '../config';
import Listing from './Listing';

// defining Models: attributes at creation and attributes output from DB
class Building extends Model<
  InferAttributes<Building>,
  InferCreationAttributes<Building>
> {
  declare id: string;
  declare url: CreationOptional<string>;
  declare listing_id: ForeignKey<Listing['id']>;
  declare expire_at: Date;
}

Building.init(
  {
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
  { sequelize: dbConn, modelName: 'building' }
);

export default Building;
