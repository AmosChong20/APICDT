import { Entry } from "./types";
import { knex } from "../db";

// CRUD operations for the `entry` table.
export const getEntriesBySchoolName = async (
  schoolName: string
): Promise<Entry[]> => {
  const results = await knex
    .select("*")
    .from("entry")
    .where({ schoolName: schoolName });
  return results;
};

export const insertEntry = async (entry: Entry): Promise<number[]> => {
  const ids = await knex.insert(entry).into("entry");
  return ids;
};

export const updateEntry = async (entry: Entry) => {
  const ids = await knex("entry")
    .update(entry)
    .where({ schoolName: entry.schoolName });
  return ids;
};

export const deleteEntryBySchoolName = async (schoolName: string) => {
  const ids = await knex("entry").where("schoolName", schoolName).del();
  return ids;
};
