import { Dialect, Sequelize } from 'sequelize';

const dbUser: string = process.env.DB_USER!;
const dbPassword: string = process.env.DB_PASSWORD!;
const dbHost: string = process.env.DB_HOST!;
const dbPort: number = parseInt(process.env.DB_PORT!);
const dbName: string = process.env.DB_NAME!;
const dbDriver: Dialect = process.env.DB_DRIVER! as Dialect;
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  port: dbPort,
  quoteIdentifiers: false,
});

export default sequelizeConnection;
