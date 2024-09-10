import { DataSource } from "typeorm";
import User from "./entity/User";
import Like from "./entity/Like";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "cat-pinterest-api-pg",
  port: 5432,
  username: "postgres",
  password: "1",
  database: "support_lk_db",
  synchronize: true,
  logging: true,
  entities: [User, Like],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
