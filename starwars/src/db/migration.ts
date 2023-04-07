import { knex } from ".";

export const initialMigration = async () => {
  await knex.schema.createTable("entry", (table) => {
    table.string("schoolName").notNullable();
    table.string("area").notNullable();
    table.integer("timeUsed").notNullable();
  });
};

initialMigration();
