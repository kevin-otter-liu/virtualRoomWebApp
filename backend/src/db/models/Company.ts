import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from 'sequelize';

import dbConn from '../config';
import User from './User';

// import Token from './Token';

// defining Models: attributes at creation and attributes output from DB
class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  declare id: string;
  declare company_location: string;
  declare company_name: string;
  declare company_email: string;
  declare user_id: ForeignKey<User['id']>;
}

Company.init(
  {
    company_location: {
      type: DataTypes.STRING,
    },
    company_name: {
      type: DataTypes.STRING,
    },
    company_email: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  { sequelize: dbConn, modelName: 'company' }
);

export default Company;
