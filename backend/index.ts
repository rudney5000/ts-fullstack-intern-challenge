import "reflect-metadata";
import AppDataSource from "./src/data-source";
import createDatabase from "./src/database";

export default async function initDatabase() {
  try {
    await createDatabase();
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    console.log("Database was created and initialized");
  } catch (error) {
    console.error("Error while creating database:", error);
  }
}

