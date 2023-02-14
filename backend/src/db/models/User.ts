import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import dbConn from '../config';
import Image from './Image';
import Listing from './Listing';
import VirtualHouse from './VirtualHouse';

// import Token from './Token';

// defining Models: attributes at creation and attributes output from DB
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare username: string;
  declare password: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  { sequelize: dbConn, modelName: 'user' }
);

// define relationship, foreign key UserId will be added to Image Model
User.hasMany(Image, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'images',
  onDelete: 'CASCADE',
});
User.hasMany(VirtualHouse, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'virtual_houses',
  onDelete: 'CASCADE',
});
User.hasMany(Listing, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'listings',
  onDelete: 'CASCADE',
});

export default User;
