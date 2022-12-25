import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import dbConn from '../config';
import Image from './Image';

// import Token from './Token';

// defining Models: attributes at creation and attributes output from DB
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare username: string;
  declare email?: string;
  declare password: string;
  declare token_id?: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token_id: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  { sequelize: dbConn }
);

// define relationship, foreign key UserId will be added to Image Model
User.hasMany(Image);

export default User;
