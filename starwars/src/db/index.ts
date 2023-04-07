import { config } from "dotenv";
import _knex, { Knex } from "knex";
config();

export const env = (name: string, defaultValue: string = "") => {
  return process.env[name] || defaultValue;
};

export const mustGetEnv = (name: string) => {
  const value = env(name);
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const knex: Knex = _knex({
  client: "mysql",
  connection: {
    host: mustGetEnv("DB_HOST"),
    port: parseInt(mustGetEnv("DB_PORT"), 10),
    user: mustGetEnv("DB_USER"),
    password: mustGetEnv("DB_PASSWORD"),
    database: mustGetEnv("DB_NAME"),
  },
});
